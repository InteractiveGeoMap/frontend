'use client'
import {
    Box,
    useDisclosure,
  } from "@chakra-ui/react"

import { useRef, useState } from 'react'
import React from 'react'
import GeoButtonDropdown from "@/components/GeoMap/GeoButtonDropdown"
import GeoSVG from "@/components/GeoMap/GeoSVG"
import {Sidebar} from"@/components/GeoMap/Sidebar"
import {RadioGroupToggle} from"@/components/GeoMap/RadioGroupToggle"

import { MAIN_CONTENT_ID } from "@/lib/constants"

const Page = React.forwardRef(({ children}, ref) => {
  return (
    <Box
      as="article"
    //   h={{base:"60vh", sm:"150vh", md:"70vh"}}
      h="90vh"
      w="full" 
    //   p={{ base: "4", lg: "8" }}
      mx="auto"
      id={MAIN_CONTENT_ID}
      scrollMarginTop={24}
      ref={ref}
      >
      {children}
    </Box>
  )
})

Page.displayName=Page

//hardcode dropDownItems for now. To write parsing logic in future

const dropDownRegion = [
  {
    text:"South East Asia",
    location:[115.6628, -2.2180],
  },
  {
    text:"East Asia",
    location:[106.5348, 38.7946]
  }
]

dropDownRegion.name="Region"

const dropDownCountry = [
  {
    text:"Thailand",
    location:[100.5018, 13.7563],
  },
  {
    text:"Malaysia",
    location:[101.6841, 3.1319],
  },
  {
    text:"Vietnam",
    location:[108.2772, 14.0583],
  },
  {
    text:"Hongkong",
    location:[114.1694, 22.3193],
  },
  {
    text:"Taiwan",
    location:[120.9605, 23.6978],
  },
  {
    text:"Philippines",
    location:[121.7740, 12.8797],
  },
  {
    text:"China",
    location:[104.1954, 35.8617],
  },
  {
    text:"Singapore",
    location:[103.8198, 1.3521],
  },
  {
    text:"Indonesia",
    location:[106.8229, -6.1944],
  },

]

dropDownCountry.name="Country"

export default function GeoMap({topoJSONData, locationJSON}) {
  const containerRef = useRef(null)
  const [ currentZoom, setZoomed ] = useState(false);
  const [ country, setCountry] = useState(null);
  const [isCollapsed, setCollapse] = useState(false);
  const [value, setValue] = useState("Globe")

  console.log("isCollapse: ", isCollapsed)
  console.log("Parent value: ", value)
  return (
      <Page 
        ref={containerRef}
        >
        <Box position="fixed" zIndex="sticky" top="15px" right="11rem" w="67.5px">
            <RadioGroupToggle h="35px"/>
        </Box>
        <Sidebar title="Explore"> 
            {/* <Box m={8}>
                Hello
            </Box>
            <Box m={8}>
                World
            </Box> */}
        </Sidebar>
          {/* <GeoButtonDropdown dropDownRegion={dropDownRegion} dropDownCountry={dropDownCountry} currentZoom={currentZoom} pos="absolute" left={{ base: "4", lg: "25%" }} mt={{base:"1", lg:"4"}} ml={{base:"1", lg:"4"}} ></GeoButtonDropdown> */}
          <GeoSVG country={country} setCountry={setCountry} currentZoom={currentZoom} setZoomed={setZoomed} topoJSONData={topoJSONData} locationJSON={locationJSON} containerRef={containerRef}></GeoSVG>
      </Page>
  )
}