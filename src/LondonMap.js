import React from 'react'
import chroma from 'chroma-js'
import { pathData } from './config'
import MapHighlight from './MapHighlight'
import backgroundImage from './media/London_satellite_photo.jpg'

export default function LondonMap({ cases, selectedArea, setSelectedArea }) {

  function logCases(areaName) {
    if (cases === []) return
    const casesInArea = cases.filter(area => area.name === areaName)[0].cases
    console.log(casesInArea)
  }

  function fillArea(areaName) {
    if (cases === undefined) return "#0000ff"
    if (cases.length === 0) return "440044"
    const casesInArea = cases.filter(area => area.name === areaName)[0].cases
    const scale = chroma.scale(['#00ff00', '#ff0000', '#770033', '#400040']).domain([0, 100, 400, 800]);
    return scale(casesInArea).hex()
  }

  function renderPaths() {
    const paths = []
    for (const [key, value] of Object.entries(pathData)) {
      const fillStr = key.replace(" 2", "")
      paths.push(
        <path
          key={key}
          fill={fillArea(fillStr)}
          onClick={() => logCases(key)}
          onMouseEnter={() => setSelectedArea(key)}
          onMouseLeave={() => setSelectedArea(null)}
          d={value}
        />
      )
    }
    return paths
  }

  return (
    <>
      <div className="map-container">
        <img className="map-background" src={backgroundImage} alt="london satellite background" />
        <svg version="1.1" className="london-map fill-parent" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 756 606.7">
          {renderPaths()}
        </svg>
        <MapHighlight area={selectedArea} />
      </div>
    </>
  )
}
