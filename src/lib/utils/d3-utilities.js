import * as d3 from 'd3'
import { on } from 'events';
import { feature } from 'topojson';

let svg
let land;
let water;
let location;
let projection;
let path;
let SCALE;
let baseSens = 0.8;
let zoomedSens = 0.2;
let theme;
let colorMode;
let currentZoom = false;
let zooming = false;
let setZoomed;
let onOpen;
let setCountry;

if (typeof window !== 'undefined') {
	//hardcoded breakpoints
	SCALE = window.innerWidth < 768 ? (window.innerWidth < 480 ? 170 : 250) : 325;
  } else {
	SCALE = 325; // Default scale for server-side rendering
}
let containerWidth;
let containerHeight;

export function zoomToLocation(coordinates) {
    svg.transition().duration(750).tween("rotate", function() {
        const r = d3.interpolate(projection.rotate(), [-coordinates[0],-coordinates[1]]);
        return function(t) {
            projection.rotate(r(t));
            svg.selectAll("path").attr("d", path);
			if (!currentZoom) {
				location
					.selectAll("circle")
					.attr('cx', d => projection(d.regionCoordinates)[0])
					.attr('cy', d => projection(d.regionCoordinates)[1])
					.style("display", d => isVisible(d.regionCoordinates)? "block":"none" )
				location
					.selectAll("text")
					.attr('x', d => projection(d.regionCoordinates)[0])
					.attr('y', d => projection(d.regionCoordinates)[1])
					.style("display", d => isVisible(d.regionCoordinates)? "block":"none" )	
			}
			else {
				location
					.selectAll("circle")
					.attr('cx', d => projection(d.countryCoordinates)[0])
					.attr('cy', d => projection(d.countryCoordinates)[1])
					.style("display", d => isVisible(d.countryCoordinates)? "block":"none" )
				location
					.selectAll("text")
					.attr('x', d => projection(d.countryCoordinates)[0])
					.attr('y', d => projection(d.countryCoordinates)[1])
					.style("display", d => isVisible(d.countryCoordinates)? "block":"none" )
			}
        }
    })
  }

function dragged(event) {
	if (!zooming) {
		let rotation = projection.rotate();
		const lambda = event.x;
		const phi = -event.y;
		if (currentZoom)
			projection.rotate([lambda * zoomedSens, phi * zoomedSens, rotation[2]]);
		else
			projection.rotate([lambda * baseSens, phi * baseSens, rotation[2]]); 
		svg.selectAll("path").attr("d", path);
		if (!currentZoom) {
			location
				.selectAll("circle")
				.attr('cx', d => projection(d.regionCoordinates)[0])
				.attr('cy', d => projection(d.regionCoordinates)[1])
				.style("display", d => isVisible(d.regionCoordinates)? "block":"none" )
			location
				.selectAll("text")
				.attr('x', d => projection(d.regionCoordinates)[0])
				.attr('y', d => projection(d.regionCoordinates)[1])
				.style("display", d => isVisible(d.regionCoordinates)? "block":"none" )
		}
		else {
			location
				.selectAll("circle")
				.attr('cx', d => projection(d.countryCoordinates)[0])
				.attr('cy', d => projection(d.countryCoordinates)[1])
				.style("display", d => isVisible(d.countryCoordinates)? "block":"none" )
			location
				.selectAll("text")
				.attr('x', d => projection(d.countryCoordinates)[0])
				.attr('y', d => projection(d.countryCoordinates)[1])
				.style("display", d => isVisible(d.countryCoordinates)? "block":"none" )
		}
	}
}

const drag = d3.drag()
	.subject(function() {
		if (!zooming) {
			const r = projection.rotate();
			if (currentZoom)	
				return { x: r[0] / zoomedSens, y: -r[1] / zoomedSens,z:r[2]};
			return { x: r[0] / baseSens, y: -r[1] / baseSens,z:r[2]};
		}
	})
	.on("drag", dragged);

function isVisible(coords) {
	const [lambda, phi] = projection.rotate();
	const rotated = d3.geoRotation([lambda, phi])(coords);
	return rotated[0] >= -90 && rotated[0] <= 90;
}

function zoomed(event) {
	zooming = true;
    const {transform} = event;
	const zoomCenterX = containerWidth / 2;
    const zoomCenterY = containerHeight / 2;
    const zoomScale = event.transform.k; // Example: Zoom to scale 2 
    const newX = containerWidth / 2 - zoomCenterX * zoomScale;
    const newY = containerHeight / 2 - zoomCenterY * zoomScale; 
    transform.x = newX;
    transform.y = newY;
    land.attr("transform", transform);
    water.attr("transform", transform)
	location.attr("transform", transform)
}



function zoomEnd(event) {
	if (event.transform.k >= 2) {
		location	
			.selectAll("circle")
			.transition()
			.duration(250)
			.attr('cx', d => projection(d.countryCoordinates)[0])
			.attr('cy', d => projection(d.countryCoordinates)[1])
			.attr("r", 6)
			.style("display", d => isVisible(d.countryCoordinates)? "block":"none" )
			.on("end",()=>zooming = false)
		location
			.selectAll("circle")
			.on("click", (e, d)=>{
				e.stopPropagation()
				currentZoom? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
				setCountry(d.country)
				onOpen()
			})
		location	
			.selectAll("text")
			.transition()
			.duration(250)
			.text(d=>d.organisationData.length)
			.style("font-size", theme.fontSizes["3xs"])
			.attr('x', d => projection(d.countryCoordinates)[0])
			.attr('y', d => projection(d.countryCoordinates)[1])
			.style("display", d => isVisible(d.countryCoordinates)? "block":"none" )
			.on("end",()=>zooming = false)
		location
			.selectAll("text")
			.on("click", (e, d)=>{
				e.stopPropagation()
				currentZoom? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
				setCountry(d.country)
				onOpen()
			})
		setZoomed(true)
	}
	else {
		location	
			.selectAll("circle")
			.transition()
			.duration(250)
			.attr('cx', d => projection(d.regionCoordinates)[0])
			.attr('cy', d => projection(d.regionCoordinates)[1])
			.attr("r", 16)
			.style("display", d => isVisible(d.regionCoordinates)? "block":"none" )
			.on("end",()=>zooming = false)
		location
			.selectAll("circle")
			.on("click", (e, d)=>{
				e.stopPropagation()
				currentZoom? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
			})
		location	
			.selectAll("text")
			.transition()
			.duration(250)
			.text(d=>d.regionCount)
			.style("font-size", theme.fontSizes.md)
			.attr('x', d => projection(d.regionCoordinates)[0])
			.attr('y', d => projection(d.regionCoordinates)[1])
			.style("display", d => isVisible(d.regionCoordinates)? "block":"none")
			.on("end",()=>zooming = false)
		location
			.selectAll("text")
			.on("click", (e, d)=>{
				e.stopPropagation()
				currentZoom? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
			})
		setZoomed(false)
			
	}
}



const zoom = d3.zoom()
    .filter((event)=>{
        return event.type === "dblclick" || event.type === "wheel" || (event.type === "touchstart" && event.touches.length >= 2) 
		|| (event.type === "touchmove" && event.touches.length >= 2) || (event.type === "touchend" && event.touches.length >= 2)
    })
	.scaleExtent([1, 6])
    .on("zoom", zoomed).on("end", zoomEnd)

export function passInitialProps(containerRef, svgRef, themeProps, colorModeProps, setZoomedProps, onOpenProps, setCountryProps) {
	theme = themeProps;
	// console.log(theme)
	colorMode = colorModeProps;
	setZoomed = setZoomedProps;
	onOpen = onOpenProps;
	setZoomed = setZoomedProps;
	setCountry = setCountryProps;
	containerWidth = containerRef.current.clientWidth
	containerHeight = containerRef.current.clientHeight
	projection = d3.geoOrthographic().clipAngle(90).translate([containerWidth/2, containerHeight/2]).scale(SCALE)
	path = d3.geoPath(projection)
	if (d3.select("#globe").empty())
		svg = d3.select(svgRef.current).attr("id", "globe")
	if (d3.select("#water").empty())
		water = svg.append("g").attr("id", "water")
	if (d3.select("#land").empty())
		land = svg.append('g').attr("id", "land")
	if (d3.select("#location").empty())
		location = svg.append("g").attr("id", "location")
	
}

export function updateLightDarkTheme(colorMode) {
	colorMode = colorMode
	water.selectAll("path").attr("fill", colorMode === 'light'? theme.semanticTokens.colors.homeBoxTurquoise._light : theme.semanticTokens.colors.homeBoxTurquoise._dark)
	land.selectAll("path").attr("fill", colorMode === 'light'? theme.semanticTokens.colors.primary300._light : theme.semanticTokens.colors.primary300._dark)
}

export function updateZoom(currentZoomProps) {
	currentZoom=currentZoomProps
}

export function renderGlobe(topoJSONData) {
	if (svg) {
		svg
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
		svg.call(zoom).call(drag)
	}
	if (water) {
		water
			.append("path")
			.datum({type:"Sphere"})
			.attr("d", path).attr("fill", colorMode === 'light'? theme.semanticTokens.colors.homeBoxTurquoise._light : theme.semanticTokens.colors.homeBoxTurquoise._dark)
	}
	if (land) {
		land
			.attr("fill", colorMode === 'light'? theme.semanticTokens.colors.primary300._light : theme.semanticTokens.colors.primary300._dark)
			.selectAll("path")
			.data(feature(topoJSONData, topoJSONData.objects.countries).features)
			.join("path")
			.attr("d", path);
	}
}


export function renderLocation(locationJSON) {
	if (location) {
		location
			.selectAll("circle")
			.attr("cursor", "pointer")
			.data(locationJSON)
			.join("circle")
			.attr("fill", d => d.color)
			.attr("id", d=>d.region)
			.attr("cx", d=>projection(d.regionCoordinates)[0])
			.attr("cy", d=>projection(d.regionCoordinates)[1])
			.attr("r", 16)
			.style("display",d=>isVisible(d.regionCoordinates[0])? "block":"none")
			.on("click", (e, d)=>{
				e.stopPropagation()
				currentZoom? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
			})
		location
			.selectAll("text")
			.attr("cursor", "pointer")
			.data(locationJSON)
			.join("text")
			.attr("fill","white")
			.style("font-size", theme.fontSizes.md)
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "middle")
			.attr("x", d=>projection(d.regionCoordinates)[0])
			.attr("y", d=>projection(d.regionCoordinates)[1])
			.text(d=>d.regionCount)
			.style("display",d=>isVisible(d.regionCoordinates[0])? "block":"none")
			.on("click", (e, d)=>{
				e.stopPropagation()
				currentZoom? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
			})
		//For initial globe spin
		zoomToLocation(locationJSON[0].regionCoordinates)
		

	}
}
