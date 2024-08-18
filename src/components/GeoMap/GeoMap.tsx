'use client'

import { useGlobe } from "@/hooks/useGlobe"
import { useRef, useState } from "react"

interface GeoMapProps { topoJSONData: any, locationData: any }

export default function GeoMap({ topoJSONData, locationData }: GeoMapProps) {
  let [country, setCountry] = useState(undefined)
  let [zoomed, setZoomed] = useState(false)
  let viewRef = useRef<HTMLDivElement>(null);
  let svgRef = useRef<SVGSVGElement>(null);

  useGlobe({ viewRef, svgRef, topoJSONData, locationData, setCountry, setZoomed })
  return (
    <div ref={viewRef} className=" w-screen h-screen fixed top-0 left-0">
      <svg ref={svgRef}>
      </svg>
    </div>
  )
}

