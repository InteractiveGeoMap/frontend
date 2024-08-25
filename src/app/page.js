
import { promises as fs } from "fs"
import GeoMap from "@/components/GeoMap"
import Papa from 'papaparse';

const topoFileName = "countries-110m.json"
// todo use json data/project_community.json
const datafileName = "SEA_data.csv"

const countries = [
  "Thailand ",
  "Malaysia",
  "Singapore",
  "Vietnam",
  "Indonesia",
  "Philippines",
  "China",
  "Taiwan ",
  "Hongkong"
]

const regionMapping = {
  "Thailand ":"South East Asia",
  Malaysia:"South East Asia",
  Singapore:"South East Asia",
  Vietnam:"South East Asia",
  Indonesia:"South East Asia",
  Philippines:"South East Asia",
  China:"East Asia",
  "Taiwan ":"East Asia",
  Hongkong:"East Asia",
}

const colorMapping = {
  "South East Asia":"#D21F3C",
  "East Asia":"#FFBF00"
}

const coordinatesMapping = {
  "South East Asia":[115.6628, -2.2180],
  "East Asia":[106.5348, 38.7946],
  "Thailand ":[100.5018, 13.7563],
  Malaysia:[101.6841, 3.1319],
  Vietnam:[108.2772, 14.0583],
  Hongkong:[114.1694, 22.3193],
  "Taiwan ":[120.9605, 23.6978],
  Philippines:[121.7740, 12.8797],
  China:[104.1954, 35.8617],
  Singapore:[103.8198, 1.3521],
  Indonesia:[106.8229, -6.1944]
}

function convertData(dataJSON) {
  //split country if there's more than one location and also filter out Global for now
  dataJSON.data.forEach(data=>{
    if (data['Base Where'].includes(',')) 
      data['Base Where']=data['Base Where'].split(",")
    else {
      data['Base Where']=[data['Base Where']]
    }
    data['Base Where'] = data['Base Where'].filter(countries=>{
      return countries !== "Global "
    })
  })
  //split organizations by regions/country
  const result = countries.map(country=>{
    let organisations = dataJSON.data.filter(data=>{
      if (data['Base Where'].includes(country))
        return data
    }) 
    return {
      region:regionMapping[country],
      regionCoordinates:coordinatesMapping[regionMapping[country]],//[longtitude,latitude]
      country:country,
      countryCoordinates:coordinatesMapping[country], //[longtitude,latitude]
      organisationData:organisations, //array
      color:colorMapping[regionMapping[country]]
    }
  })
  //count organisation by regions and countries
  let SEAcount = 0;
  let EastAsiaCount = 0;
  result.forEach(country=> {
    if (country.region === "South East Asia")
      SEAcount += country.organisationData.length;
    else
      EastAsiaCount += country.organisationData.length;
  })
  result.forEach(country=>{
    if (country.region === "South East Asia")
      country.regionCount = SEAcount
    else 
      country.regionCount = EastAsiaCount
  })
  return result
}


export default async function Home() {
  const content = await fs.readFile(process.cwd()+"/src/data/" + topoFileName, "utf8")
  const topoJSONData = JSON.parse(content)
  const data = await fs.readFile(process.cwd()+"/src/data/" + datafileName, "utf8")
  const dataJSON = Papa.parse(data, {header:true})
  const locationJSON = convertData(dataJSON)

  return (
    <GeoMap topoJSONData={topoJSONData} locationJSON={locationJSON}>
      
    </GeoMap>
  );
}
