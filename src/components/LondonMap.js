import React from 'react'
// import chroma from 'chroma-js'
import { pathData } from '../config'
import MapHighlight from './MapHighlight'
import { pure } from 'recompose';

function LondonMap({ cases, selectedArea, setSelectedArea, strokeLondon, popup, setPopup }) {

  // function logCases(areaName) {
  //   if (cases === []) return
  //   const areaNameStr = areaName.replace(" 2", "") // Two boroughs have 2 svg paths, where the second path ends in " 2". This makes converts that path name into a legitimate area name
  //   const casesInArea = cases.filter(area => area.name === areaNameStr)[0].cases
  //   console.log(areaNameStr, casesInArea)
  // }

  function fillArea(areaName) {
    if (cases === undefined) return "#0000ff"
    if (cases.length === 0) return "440044"
    // const casesInArea = cases.filter(area => area.name === areaName)[0].cases
    // const scale = chroma.scale(['#75ff75', '#ffa114', '#fc0505', '#ad001a']).domain([0, 100, 400, 800]);
    return "#ffffff"//scale(casesInArea).hex()
  }

  function renderPaths() {
    const paths = []
    for (const [key, value] of Object.entries(pathData)) {
      const fillStr = key.replace(" 2", "")
      paths.push(
        <path
          key={key}
          fill={fillArea(fillStr)}
          onClick={() => setPopup(true)} //logCases(key)
          onMouseEnter={() => setSelectedArea(key)}
          onMouseLeave={() => {if (!popup) setSelectedArea(null)}}
          d={value}
        />
      )
    }
    return paths
  }

  return (
    <div className="map-wrapper flex-center">
      <div className="map-container" onClick={() => { if (strokeLondon) setPopup(true) }}>
        <svg
          version="1.1"
          className={`london-map fill-parent ${strokeLondon ? "stroke-london" : ""}`}
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