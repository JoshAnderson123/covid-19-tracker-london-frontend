import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js'
import { chartSettings, trimArea } from '../util'
import { pure } from 'recompose';

function Charts({ caseDataArr, selectedArea }) {

  const caseChart = useRef()
  const deathChart = useRef()

  useEffect(() => {
    window.onresize = (e) => {
      resizeCanvas()
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
    deathChart.current.data.datasets[0].data = londonCaseData.deathData
    resizeCanvas()

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

  function resizeCanvas() {   
    
    function resizeC(canvasID, chartRef) {
      const RATIO = 1
      const chart = document.querySelector(canvasID)
      const rect = chart.getBoundingClientRect()
      chart.width = Math.round(rect.width * RATIO)
      chart.height = Math.round(rect.height * RATIO)
      chart.style.width = '100%'//`${chart.width}px`
      chart.style.height = '100%'//`${chart.height}px`
      chart.getContext("2d").setTransform(RATIO, 0, 0, RATIO, 0, 0);
      // chart.style.width = `${chart.width-1}px`
      // chart.style.height = `${chart.height-1}px`
      if(chartRef) {
        const ticksLim = rect.width < 400 ? Math.floor(rect.width/100) : Math.floor(rect.width/90)
        chartRef.current.options.scales.xAxes[0].ticks.maxTicksLimit = ticksLim
        console.log(chart.width, rect.width)
        chartRef.current.update()
      }
    }

    resizeC("#cases-chart", caseChart)
    resizeC("#deaths-chart", deathChart)
  }

  return (
    <div className="charts-container">
      <div className="chart-container f-c" id="chart-container-cases">
        <div className="chart-wrapper">
          <canvas id="cases-chart"></canvas>
          {document.querySelector("#cases-chart") ? `${document.querySelector("#cases-chart").style.width}, ${document.querySelector("#cases-chart").width}` : "casesChart=null"}
        </div>
      </div>
      <div className="chart-container f-c" id="chart-container-deaths">
        <div className="chart-wrapper">
          <canvas id="deaths-chart"></canvas>
          {document.querySelector("#deaths-chart") ? selectedArea ? selectedArea : "null" : "deathsChart=null"}
        </div>
      </div>
    </div>
  )
}

export default pure(Charts)