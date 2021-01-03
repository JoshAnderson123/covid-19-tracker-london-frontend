import React from 'react'
import StatBlock from './StatBlock'
import MapLegend from './MapLegend'
import { numberWithCommas, trimArea } from '../../util'

export default function MapStats({ caseData, date, selectedArea }) {

  let data, cases, deaths
  if (caseData && selectedArea) {
    data = caseData[date]
    cases = data.reduce((acc, area) => acc + area.cases, 0)
    deaths = data.reduce((acc, area) => acc + area.deaths, 0)
    cases = cases === null ? 0 : cases
    deaths = deaths === null ? 0 : deaths
  }

  return (
    <div className="map-stats flex-sb">
      <div className="left-container flex-sb">
        <StatBlock hAlign={"ta-left"} vDirection={"top"} stat1={(![undefined, null].includes(cases)) ? numberWithCommas(cases) : "Unconfirmed"} stat2={"Cases"} />
        <StatBlock hAlign={"ta-left"} vDirection={"top"} stat1={(![undefined, null].includes(deaths)) ? numberWithCommas(deaths) : "Unconfirmed"} stat2={"Deaths"} />
      </div>
      <MapLegend />
    </div>
  )
}
