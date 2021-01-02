import React from 'react'
import '../../css/LondonMap.css'
import chroma from 'chroma-js'
import { pathData } from '../../config'
import MapHighlight from './MapHighlight'
import { pure } from 'recompose';

function LondonMap({ cases, selectedArea, setSelectedArea, strokeLondon }) {

  function fillArea(areaName) {
    if (cases === undefined) return "#0000ff"
    if (cases.length === 0) return "440044"
    const casesInArea = cases.filter(area => area.name === areaName)[0].cases
    const scale = chroma.scale(['#75ff75', '#ffa114', '#fc0505', '#ad001a']).domain([0, 100, 400, 800]);
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
          onClick={() => { console.log(fillStr); setSelectedArea(fillStr)}}
          onMouseEnter={() => setSelectedArea(fillStr)}
          onMouseLeave={() => {setSelectedArea("London")}}
          d={value}
        />
      )
    }
    return paths
  }

  return (
    <div className="map-wrapper flex-center">
      <div className="map-container size-of-parent">
        <svg
          version="1.1"
          className={`london-map size-of-parent ${strokeLondon ? "stroke-london" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          x="0px" y="0px" viewBox="0 0 756 606.7"
        >
          {renderPaths()}
        </svg>
        <MapHighlight area={selectedArea} />
      </div>
    </div>
  )
}

export default pure(LondonMap)