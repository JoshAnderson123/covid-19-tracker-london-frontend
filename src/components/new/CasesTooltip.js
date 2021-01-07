import React, {useEffect, useRef} from 'react'
import { tooltipAreaOffset } from '../../config'
import { trimArea, casesPerHundredThousand, toCSS } from '../../util'

export default function CasesTooltip({ mousePos, cases, selectedArea }) {


  const area = useRef()

  useEffect(() => {
    const areaRect = document.querySelector(`.${toCSS(selectedArea)}`).getBoundingClientRect()
    const mapRect = document.querySelector("#map-card").getBoundingClientRect()
    area.current = {
      x: areaRect.x - mapRect.x + (tooltipAreaOffset[selectedArea].x * areaRect.width),
      y: areaRect.y - mapRect.y + (tooltipAreaOffset[selectedArea].y * areaRect.height),
      width: areaRect.width,
      height: areaRect.height
    }
  }, [selectedArea])

  const selectedAreaName = ([undefined, null].includes(selectedArea)) ? "London" : trimArea(selectedArea)
  const areaData = cases.filter(area => area.name === trimArea(selectedArea))[0]

  return (
    area.current !== undefined ?
    <div className="case-tooltip-container" style={{ left: `${area.current.x + area.current.width}px`, top: `${area.current.y + area.current.height}px` }} >
      <div className="title">{selectedAreaName}</div>
      <div className="label">{`Cases/100k: ${casesPerHundredThousand(areaData.cases, selectedArea)}`}</div>
      <div className="label">{`Deaths: ${areaData.deaths === null ? 0 : areaData.deaths}`}</div>
    </div> :
    null
  )
}
