import React from 'react'
import { caseTooltipOffset as offset } from '../../config'

export default function CasesTooltip({ mousePos, cases, selectedArea }) {

  function sumCases() {
    const casesSum = cases.reduce((acc, area) => acc + area.cases, 0)
    const deathsSum = cases.reduce((acc, area) => acc + area.deaths, 0)
    return {cases: casesSum, deaths: deathsSum}
  }

  const selectedAreaName = ([undefined, null].includes(selectedArea)) ? "London" : selectedArea.replace(" 2", "")
  const areaData = (selectedAreaName === "London") ? sumCases() : cases.filter(area => area.name === selectedAreaName)
  const casesNumber = (selectedAreaName === "London") ? areaData.cases : (areaData.length > 0) ? areaData[0].cases : -1

  return (
    <div className="case-tooltip-container" style={{ left: mousePos.x + offset.x, top: mousePos.y + offset.y }} >
      <div className="title">{selectedAreaName}</div>
      <div className="case-label">{`Cases: ${casesNumber}`}</div>
    </div>
  )
}
