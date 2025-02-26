import React from 'react'
import '../css/LondonMap.css'
import chroma from 'chroma-js'
import { pathData, cssName } from '../config'
import { casesPerHundredThousand } from '../util'
import MapHighlight from './MapHighlight'
import { pure } from 'recompose';

function LondonMap({ cases, selectedArea, setSelectedArea, hoverArea, setHoverArea}) {

  const mapContainerRect = document.querySelector(".map-container")
  const rect = mapContainerRect ? mapContainerRect.getBoundingClientRect() : { width: 100, height: 100 }

  function fillArea(areaName) {
    if (cases === undefined) return "#0000ff"
    if (cases.length === 0) return "440044"
    const casesInArea = cases.filter(area => area.name === areaName)[0].cases
    const scale = chroma.scale(['#75ff75', '#ffa114', '#fc0505', '#ad001a']).domain([0, 50, 170, 400]);
    return scale(casesPerHundredThousand(casesInArea, areaName)).hex()
  }

  function renderPaths() {
    const paths = []
    for (const [key, value] of Object.entries(pathData)) {
      const fillStr = key.replace(" 2", "");
      const cssStr = cssName[key]
      paths.push(
        <path
          className={cssStr}
          key={key}
          fill={fillArea(fillStr)}
          onClick={() => setSelectedArea(fillStr)}
          onTouchStart={() => setSelectedArea(fillStr)}
          onMouseEnter={() => setHoverArea(key)}
          onMouseLeave={() => {setHoverArea(null)} }
          d={value}
        />
      )
    }
    return paths
  }

  // SVGs are causing crashes on mobile

  return (
    <div className="map-wrapper f-c">
      <div className="map-container stretch" onClick={() => {if(hoverArea === null) setSelectedArea("London")}}>
        <svg
          version="1.1"
          className="london-map stretch"
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          x="0px" y="0px" viewBox="0 0 756 606.7"
          width={`${rect.width}px`} height={`${rect.height}px`}
        >
          {renderPaths()} 
        </svg>
        {selectedArea ? <MapHighlight area={selectedArea} type="selected" /> : null}
        {(hoverArea && ["London", null].includes(selectedArea)) ? <MapHighlight area={hoverArea} type="hover" /> : null}
      </div>
    </div>
  )
}

export default pure(LondonMap)