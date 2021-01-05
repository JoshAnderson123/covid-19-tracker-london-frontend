import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js'
import { chartSettings, trimArea } from '../../util'
import { pure } from 'recompose';

function Charts({ caseDataArr, selectedArea, strokeLondon }) {

  const caseChart = useRef()
  const deathChart = useRef()

  // let [chartHeight, setChartHeight] = useState(0)

  useEffect(() => {
    // window.onresize = (e) => {
      
    //   const containerRect = document.querySelector("#chart-container-cases").getBoundingClientRect()
    //   setChartHeight(containerRect.height/2)
    // }

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
  }, [])

  useEffect(() => {

    if (!caseDataArr || !selectedArea) return
    const areaName = strokeLondon ? "London" : trimArea(selectedArea)
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

    if (![null, undefined].includes(caseChart.current)) caseChart.current.destroy();
    const ctxCases = document.getElementById('cases-chart').getContext('2d');
    caseChart.current = new Chart(ctxCases, chartSettings(londonCaseData.labels, londonCaseData.caseData, areaName, "Daily Cases"));

    if (![null, undefined].includes(deathChart.current)) deathChart.current.destroy();
    const ctxDeaths = document.getElementById('deaths-chart').getContext('2d');
    deathChart.current = new Chart(ctxDeaths, chartSettings(londonCaseData.labels, londonCaseData.deathData, areaName, "Daily Deaths"));

    // eslint-disable-next-line
  }, [caseDataArr, selectedArea])

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