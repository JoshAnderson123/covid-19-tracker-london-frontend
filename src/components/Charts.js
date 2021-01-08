import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import { chartSettings, trimArea } from '../util'
import { pure } from 'recompose';

function Charts({ caseDataArr, selectedArea }) {

  const caseChart = useRef()
  const deathChart = useRef()

  useEffect(() => {
    window.onresize = (e) => {

      const casesChart = document.querySelector("#cases-chart")
      const deathsChart = document.querySelector("#deaths-chart")
      casesChart.style.width = `0px`
      casesChart.style.height = `0px`
      deathsChart.style.width = `0px`
      deathsChart.style.height = `0px`
      casesChart.width = 0
      casesChart.height = 0
      deathsChart.width = 0
      deathsChart.height = 0
    }

    Chart.pluginService.register({
      beforeDraw: function (chart, easing) {
        if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
          var ctx = chart.chart.ctx;
          var chartArea = chart.chartArea;

          ctx.save();
          ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
          ctx.restore();
        }
      }
    });

    const londonCaseData = getLondonCaseData()

    const ctxCases = document.getElementById('cases-chart').getContext('2d');
    caseChart.current = new Chart(ctxCases, chartSettings(londonCaseData.labels, londonCaseData.caseData, londonCaseData.areaName, "Daily Cases"));

    const ctxDeaths = document.getElementById('deaths-chart').getContext('2d');
    deathChart.current = new Chart(ctxDeaths, chartSettings(londonCaseData.labels, londonCaseData.deathData, londonCaseData.areaName, "Daily Deaths"));

    // eslint-disable-next-line
  }, [])

  useEffect(() => {

    if (!caseDataArr) return
    const londonCaseData = getLondonCaseData()

    caseChart.current.data.datasets[0].data = londonCaseData.caseData
    caseChart.current.update()
    deathChart.current.data.datasets[0].data = londonCaseData.deathData
    deathChart.current.update()

    // eslint-disable-next-line
  }, [caseDataArr, selectedArea])

  function getLondonCaseData() {
    const areaName = !selectedArea ? "London" : trimArea(selectedArea)
    const sortedData = caseDataArr.sort((a, b) => a.date < b.date ? -1 : 1)

    const labels = sortedData.map(day => day.date)
    const caseData = (areaName === "London") ?
      sortedData.map(day => day.data.reduce((acc, area) => acc + area.cases, 0)) :
      sortedData.map(day => day.data.filter(area => area.name === areaName)[0].cases)
    const deathData = (areaName === "London") ?
      sortedData.map(day => day.data.reduce((acc, area) => acc + area.deaths, 0)) :
      sortedData.map(day => day.data.filter(area => area.name === areaName)[0].deaths)

    return {
      labels,
      caseData,
      deathData,
      areaName
    }
  }

  return (
    <div className="charts-container">
      <div className="chart-container" id="chart-container-cases">
        <canvas id="cases-chart"></canvas>
      </div>
      <div className="chart-container" id="chart-container-deaths">
        <canvas id="deaths-chart"></canvas>
      </div>
    </div>
  )
}

export default pure(Charts)