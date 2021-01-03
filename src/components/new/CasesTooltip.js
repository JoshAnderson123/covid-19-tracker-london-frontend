import React from 'react'
import { caseTooltipOffset as offset } from '../../config'
import { trimArea, casesPerHundredThousand } from '../../util'

export default function CasesTooltip({ mousePos, cases, selectedArea }) {

  // function sumCases() {
  //   const casesSum = cases.reduce((acc, area) => acc + area.cases, 0)
  //   const deathsSum = cases.reduce((acc, area) => acc + area.deaths, 0)
  //   return { cases: casesSum, deaths: deathsSum }
  // }

  const rect = document.querySelector("#map-card").getBoundingClientRect()
  const selectedAreaName = ([undefined, null].includes(selectedArea)) ? "London" : trimArea(selectedArea)
  // const areaData = (selectedAreaName === "London") ? sumCases() : cases.filter(area => area.name === selectedAreaName)
  const areaData = cases.filter(area => area.name === trimArea(selectedArea))[0]
  // const casesNumber = (selectedAreaName === "London") ? areaData.cases : (areaData.length > 0) ? areaData[0].cases : -1

  return (
    <div className="case-tooltip-container" style={{ left: mousePos.x - rect.x + offset.x, top: mousePos.y - rect.y + offset.y }} >
      <div className="title">{selectedAreaName}</div>
      <div className="label">{`Cases/100k: ${casesPerHundredThousand(areaData.cases, selectedArea)}`}</div>
      <div className="label">{`Deaths: ${areaData.deaths === null ? 0 : areaData.deaths}`}</div>
    </div>
  )
}
