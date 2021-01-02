import React from 'react'
import StatBlock from './StatBlock'
import {numberWithCommas} from '../../util'

export default function MapStats({ caseData, date, selectedArea }) {

  let data, cases, deaths
  if (caseData && selectedArea) {
    data = caseData[date]
    if (selectedArea === "London") {
      cases = data.reduce((acc, area) => acc + area.cases, 0)
      deaths = data.reduce((acc, area) => acc + area.deaths, 0)
    } else {
      cases = data.filter(area => area.name === selectedArea)[0].cases
      deaths = data.filter(area => area.name === selectedArea)[0].deaths
    }
  }

  return (
    <div className="map-stats flex-sb">
      <StatBlock hAlign={"ta-left"} vDirection={"top"} stat1={(cases !== undefined) ? numberWithCommas(cases) : "Unconfirmed"} stat2={"Cases"} />
      <StatBlock hAlign={"ta-right"} vDirection={"top"} stat1={(deaths !== undefined) ? numberWithCommas(deaths) : "Unconfirmed"} stat2={"Deaths"} />
    </div>
  )
}
