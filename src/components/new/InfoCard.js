import React from 'react'
import '../../css/Cards.css'
import '../../css/InfoCard.css'
import StatBlock from './StatBlock'
import Charts from './Charts'
import { getBoroughSummaryData, numberWithCommas, formatReadableDateShort, formatDate } from '../../util'

export default function InfoCard({ caseDataArr, selectedArea, sliderData, caseData }) {

  const summaryData = getBoroughSummaryData(selectedArea, caseDataArr)
  let data, latestCases, latestDeaths
  if (caseData && ![undefined, null, {}].includes(sliderData)) {
    data = caseData[formatDate(sliderData.endDate)]
    if (data) {
      if (selectedArea === "London") {
        latestCases = data.reduce((acc, area) => acc + area.cases, 0)
        latestDeaths = data.reduce((acc, area) => acc + area.deaths, 0)
      } else {
        latestCases = data.filter(area => area.name === selectedArea)[0].cases
        latestDeaths = data.filter(area => area.name === selectedArea)[0].deaths
      }
    }
  }

  return (
    <div className="card-container flex-v-start">
      <div className="card-title">{selectedArea}</div>
      <div className="separator-line"></div>
      <div className="info-stats-container" style={{ marginBottom: "20px" }}>
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Population"} stat2={numberWithCommas(summaryData.population)} />
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Total Cases"} stat2={numberWithCommas(summaryData.totalCases)} />
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Total Deaths"} stat2={numberWithCommas(summaryData.totalDeaths)} />
      </div>
      <div className="card-title-small">Latest Figures</div>
      <div className="separator-line"></div>
      <div className="info-stats-container" style={{ marginBottom: "20px" }}>
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Date"} stat2={formatReadableDateShort(sliderData.endDate)} />
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Cases"} stat2={(latestCases !== undefined) ? numberWithCommas(latestCases) : "Unconfirmed"} />
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Deaths"} stat2={(latestDeaths !== undefined) ? numberWithCommas(latestDeaths): "Unconfirmed"} />
        <StatBlock hAlign={"ta-left"} vDirection={"bottom"} stat1={"Tier"} stat2={"4"} />
      </div>
      <div className="card-title-small">Timeline</div>
      <Charts caseDataArr={caseDataArr} selectedArea={selectedArea} strokeLondon={false} />
    </div>
  )
}
