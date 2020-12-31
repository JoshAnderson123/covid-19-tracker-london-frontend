import React from 'react'
import { caseTooltipOffset as offset } from './config'

export default function CasesTooltip({ mousePos, cases, selectedArea }) {

  const selectedAreaName = ([undefined, null].includes(selectedArea)) ? undefined : selectedArea.replace(" 2", "")
  const areaData = cases.filter(area => area.name === selectedAreaName)
  const casesNumber = (areaData.length > 0) ? areaData[0].cases : -1

  return (
    <div className="case-tooltip-container" style={{ left: mousePos.x + offset.x, top: mousePos.y + offset.y }} >
      <div className="title">{selectedAreaName}</div>
      <div className="case-label">{`Cases: ${casesNumber}`}</div>
    </div>
  )
}
