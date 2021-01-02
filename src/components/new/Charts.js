import React, { useEffect } from 'react'
import Chart from 'chart.js'
import { chartSettings } from '../../util'
import { pure } from 'recompose';

function Charts({ caseDataArr, selectedArea, strokeLondon }) {

  useEffect(() => {
    if (!caseDataArr || !selectedArea) return
    const areaName = strokeLondon ? "London" : selectedArea.replace(" 2", "")
    const sortedData = caseDataArr.sort((a, b) => a.date < b.date ? -1 : 1)

    const labels = sortedData.map(day => day.date)
    const caseData = (areaName === "London") ?
      sortedData.map(day => day.data.reduce((acc, area) => acc + area.cases, 0)) :
      sortedData.map(day => day.data.filter(area => area.name === areaName)[0].cases)
    const deathData = (areaName === "London") ?
      sortedData.map(day => day.data.reduce((acc, area) => acc + area.deaths, 0)) :
      sortedData.map(day => day.data.filter(area => area.name === areaName)[0].deaths)

    const londonCaseData = {
      labels,
      caseData,
      deathData
    }

    const ctxCases = document.getElementById('cases-chart').getContext('2d');
    new Chart(ctxCases, chartSettings(londonCaseData.labels, londonCaseData.caseData, areaName, "Daily Cases"));
    const ctxDeaths = document.getElementById('deaths-chart').getContext('2d');
    new Chart(ctxDeaths, chartSettings(londonCaseData.labels, londonCaseData.deathData, areaName, "Daily Deaths"));
    // eslint-disable-next-line
  }, [caseDataArr, selectedArea])

  return (
    <div className="charts-container">
      <div className="chart-container">
        <canvas id="cases-chart"></canvas>
      </div>
      <div className="chart-container">
        <canvas id="deaths-chart"></canvas>
      </div>
    </div>
  )
}

export default pure(Charts)