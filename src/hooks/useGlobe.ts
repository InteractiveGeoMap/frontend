import { useColorMode } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import * as d3 from 'd3';
import { RefObject, useEffect, useRef } from 'react';
import * as topojson from 'topojson';

interface UseGlobeProps {
	viewRef: RefObject<HTMLDivElement>,
	svgRef: RefObject<SVGSVGElement>,
	topoJSONData: any,
	locationData: any,
	setCountry?: Function,
	onOpen?: Function,
	setZoomed?: Function,
}

export function useGlobe({ viewRef, svgRef, topoJSONData, locationData, setCountry, onOpen, setZoomed }: UseGlobeProps) {

	let boxSize = useRef<number[] | null>(null);
	let projection = useRef<d3.GeoProjection | null>(null)
	let path = useRef<d3.GeoPath<any, d3.GeoPermissibleObjects> | null>(null);
	let svg = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
	let water = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
	let land = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
	let location = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
	let zooming = useRef<boolean>(false);
	let SCALE: number
	let drag = useRef<d3.DragBehavior<Element, any, any> | null>(null);
	let baseSens = 0.8;
	let currentZoom = useRef<boolean>(false);
	let zoomedSens = 0.2;

	if (typeof window !== 'undefined') {
		//hardcoded breakpoints
		SCALE = window.innerWidth < 768 ? (window.innerWidth < 480 ? 170 : 250) : 325;
	} else {
		SCALE = 325; // Default scale for server-side rendering
	}

	let theme = useTheme();
	let colorMode = useColorMode();

	function zoomToLocation(coordinates: number[]) {
		if (!svg.current) return
		svg.current.transition().duration(750).tween("rotate", () => {
			if (!projection.current) return
			const r = d3.interpolate(projection.current.rotate(), [-coordinates[0], -coordinates[1]]);
			return function(t: any) {
				if (!projection.current || !svg.current || !location.current) return
				projection.current.rotate(r(t));
				svg.current.selectAll("path").attr("d", path.current);
				location.current
					.selectAll("circle")
					.attr('cx', (d: any) => getCoordinate(d, true))
					.attr('cy', (d: any) => getCoordinate(d, false))
					.style("display", (d: any) => isVisible(d) ? "block" : "none")
				location.current
					.selectAll("text")
					.attr('x', (d: any) => getCoordinate(d, true))
					.attr('y', (d: any) => getCoordinate(d, false))
					.style("display", (d: any) => isVisible(d) ? "block" : "none")
			}
		})
	}

	function getCoordinate(d: any, isX: boolean) {
		const index = isX ? 0 : 1;
		if (currentZoom.current)
			return projection.current!(d.countryCoordinates)![index]
		else
			return projection.current!(d.regionCoordinates)![index]
	}

	function dragged(event: any) {
		if (zooming.current || !projection.current || !svg.current || !location.current) return;
		let rotation = projection.current.rotate();
		const lambda = event.x;
		const phi = -event.y;
		const sens = currentZoom.current ? zoomedSens : baseSens
		svg.current.selectAll("path").attr("d", path.current);
		projection.current.rotate([lambda * sens, phi * sens, rotation[2]]);
		location.current
			.selectAll("circle")
			.attr('cx', (d: any) => getCoordinate(d, true))
			.attr('cy', (d: any) => getCoordinate(d, false))
			.style("display", (d: any) => isVisible(d) ? "block" : "none")
		location.current
			.selectAll("text")
			.attr('x', (d: any) => getCoordinate(d, true))
			.attr('y', (d: any) => getCoordinate(d, false))
			.style("display", (d: any) => isVisible(d) ? "block" : "none")
	}

	function isVisible(d: any) {
		const coords = currentZoom.current ? d.countryCoordinates : d.regionCoordinates
		if (!projection.current) return
		const [lambda, phi] = projection.current.rotate();
		const rotated = d3.geoRotation([lambda, phi])(coords);
		return rotated[0] >= -90 && rotated[0] <= 90;
	}

	function zoomed(event: any) {
		if (!land.current || !water.current || !location.current || !boxSize.current)
			return;
		zooming.current = true;
		const { transform } = event;
		const zoomCenterX = boxSize.current[0] / 2;
		const zoomCenterY = boxSize.current[1] / 2;
		const zoomScale = event.transform.k; // Example: Zoom to scale 2 
		const newX = boxSize.current[0] / 2 - zoomCenterX * zoomScale;
		const newY = boxSize.current[1] / 2 - zoomCenterY * zoomScale;
		transform.x = newX;
		transform.y = newY;

		land.current.attr("transform", transform);
		water.current.attr("transform", transform);
		location.current.attr("transform", transform);
	}

	function zoomEnd(event: any) {
		if (!location.current || !projection.current)
			return;

		currentZoom.current = event.transform.k >= 2
		if (!projection.current)
			return;
		location.current
			.selectAll("circle")
			.transition()
			.duration(250)
			.attr('cx', (d: any) => getCoordinate(d, true))
			.attr('cy', (d: any) => getCoordinate(d, false))
			.attr("r", 6)
			.style("display", (d: any) => isVisible(d) ? "block" : "none")
		location.current
			.selectAll("circle")
			.on("click", (e: any, d: any) => {
				e.stopPropagation()
				currentZoom.current ? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
				setCountry!(d.country)
				onOpen!()
			})
		location.current
			.selectAll("text")
			.transition()
			.duration(250)
			.text((d: any) => d.organisationData.length)
			.style("font-size", theme.fontSizes["3xs"])
			.attr('x', (d: any) => getCoordinate(d, true))
			.attr('y', (d: any) => getCoordinate(d, false))
			.style("display", (d: any) => isVisible(d) ? "block" : "none")
		location.current
			.selectAll("text")
			.on("click", (e: any, d: any) => {
				e.stopPropagation()
				currentZoom.current ? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
				setCountry!(d.country)
				onOpen!()
			})
		setZoomed!(currentZoom.current)
		zooming.current = false;

	}

	const zoom = d3.zoom()
		.filter((event) => {
			return event.type === "dblclick" || event.type === "wheel" || (event.type === "touchstart" && event.touches.length >= 2)
				|| (event.type === "touchmove" && event.touches.length >= 2) || (event.type === "touchend" && event.touches.length >= 2)
		})
		.scaleExtent([1, 6])
		.on("zoom", zoomed).on("end", zoomEnd)


	function updateLightDarkTheme() {
		if (!water.current || !land.current) return
		water.current.selectAll("path").attr("fill", colorMode.colorMode === 'light' ? theme.semanticTokens.colors.homeBoxTurquoise._light : theme.semanticTokens.colors.homeBoxTurquoise._dark)
		land.current.selectAll("path").attr("fill", colorMode.colorMode === 'light' ? theme.semanticTokens.colors.primary300._light : theme.semanticTokens.colors.primary300._dark)
	}
	//! to fix
	function renderGlobe() {
		if (!svg.current || !water.current || !land.current || !path.current || !boxSize.current || !drag.current)
			return;
		svg.current.attr("width", "100%")
			.attr("height", "100%")
			.attr("viewBox", `0 0 ${boxSize.current[0]} ${boxSize.current[1]}`)
		svg.current.call((s) => zoom(s)).call((s) => drag.current(s))
		water.current
			.append("path")
			.datum({ type: "Sphere" })
			.attr("d", path.current)
			.attr("fill", "#6060ff")
		land.current
			.attr("fill", "#404040")
			.selectAll("path")
			.data(topojson.feature(topoJSONData, topoJSONData.objects.countries).features)
			.join("path")
			.attr("d", path.current);

	}

	function renderLocation() {
		if (!location.current || !projection.current) return
		location.current
			.selectAll("circle")
			.attr("cursor", "pointer")
			.data(locationData)
			.join("circle")
			.attr("fill", (d: any) => d.color)
			.attr("id", (d: any) => d.region)
			.attr("cx", (d: any) => projection.current!(d.regionCoordinates)![0])
			.attr("cy", (d: any) => projection.current!(d.regionCoordinates)![1])
			.attr("r", 16)
			.style("display", (d: any) => isVisible(d) ? "block" : "none")
			.on("click", (e: any, d: any) => {
				e.stopPropagation()
				currentZoom.current ? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
			})
		location.current
			.selectAll("text")
			.attr("cursor", "pointer")
			.data(locationData)
			.join("text")
			.attr("fill", "white")
			.style("font-size", theme.fontSizes.md)
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "middle")
			.attr("x", (d: any) => projection.current!(d.regionCoordinates)![0])
			.attr("y", (d: any) => projection.current!(d.regionCoordinates)![1])
			.text((d: any) => d.regionCount)
			.style("display", (d: any) => isVisible(d) ? "block" : "none")
			.on("click", (e: any, d: any) => {
				e.stopPropagation()
				currentZoom.current ? zoomToLocation(d.countryCoordinates) : zoomToLocation(d.regionCoordinates)
			})
		//For initial globe spin
		zoomToLocation(locationData[0].regionCoordinates)


	}


	useEffect(() => {
		if (!viewRef.current) return;
		boxSize.current = [viewRef.current?.offsetWidth, viewRef.current?.offsetHeight]
		projection.current = d3.geoOrthographic()
			.scale(250)
			.center([0, 0])
			.translate([boxSize.current[0] / 2, boxSize.current[1] / 2]).precision(1);
		path.current = d3.geoPath().projection(projection.current);

		drag.current = d3.drag()
			.subject(function() {
				if (zooming.current) return;
				const r = projection.current!.rotate();
				const sens = currentZoom.current ? zoomedSens : baseSens
				return { x: r[0] / sens, y: -r[1] / sens, z: r[2] };
			})
			.on("drag", dragged);
		if (!svgRef || !svgRef.current) return;
		svg.current = d3.select(svgRef.current).attr("id", "globe")
		water.current = svg.current.append("g").attr("id", "water")
		land.current = svg.current.append('g').attr("id", "land")
		location.current = svg.current.append("g").attr("id", "location")
		console.log("topojson", topojson.feature(topoJSONData, topoJSONData.objects.countries))

		renderGlobe();
		renderLocation();
	}, [])

	useEffect(() => {
		updateLightDarkTheme()
	}, [colorMode.colorMode])
}
