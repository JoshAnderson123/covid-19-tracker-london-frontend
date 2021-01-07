import React, { useEffect, useState } from 'react'
import Chart from 'chart.js'
import { chartSettings, trimArea } from '../../util'
import { pure } from 'recompose';

function CasesChart({ caseDataArr, selectedArea, strokeLondon, setPopup }) {

  const [closing, setClosing] = useState(false)
  
  useEffect(() => {

    // console.log("SelectedArea: ", selectedArea, ", StrokeLondon: ", strokeLondon)
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

    const ctxCases = document.getElementById('cases-chart').getContext('2d');
    new Chart(ctxCases, chartSettings(londonCaseData.labels, londonCaseData.caseData, areaName, "Daily Cases"));
    const ctxDeaths = document.getElementById('deaths-chart').getContext('2d');
    new Chart(ctxDeaths, chartSettings(londonCaseData.labels, londonCaseData.deathData, areaName, "Daily Deaths"));
    // eslint-disable-next-line
  }, [])

  function closePopup() {
    setClosing(true)
    setTimeout(() => {
      setPopup(false)
    }, 200)
  }

  return (
    <div className={`popup-container fill-parent f-c ${closing ? "popup-closing" : "popup-opening"}`} onClick={() => closePopup()}>
      <div className="charts-container f-c">
        <div className="popup-title">{(strokeLondon || !selectedArea) ? "London" : trimArea(selectedArea)}</div>
        <div className="chart-container">
          <canvas id="cases-chart"></canvas>
        </div>
        <div className="chart-container">
          <canvas id="deaths-chart"></canvas>
        </div>
      </div>
    </div>
  )
}

export default pure(CasesChart)