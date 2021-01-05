import { boroughPopulations } from './config'

const KEY_LEFT = 37,
  KEY_RIGHT = 39

// const DAY_MILLIS = 1000 * 60 * 60 * 24

export function caseDataArrToDict(arr) {
  const dict = {}
  // console.log(arr)
  for (let entry of arr) {
    const date = entry.date
    dict[date] = entry.data
  }
  return dict
}

export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export function formatReadableDate(date) {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']

  const d = new Date(date),
    month = months[d.getMonth()],
    day = days[d.getDate() - 1],
    year = d.getFullYear();

  return `${month} ${day}, ${year}`
}

export function formatReadableDateShort(date) {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']

  const d = new Date(date),
    month = months[d.getMonth()],
    day = days[d.getDate() - 1],
    year = d.getFullYear();

  return `${month} ${day}, ${year}`
}

export function formatReadableDateShorter(date) {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st']

  const d = new Date(date),
    month = months[d.getMonth()],
    day = days[d.getDate() - 1]

  return `${month} ${day}`
}

export function handleKeyPress(e, date, updateDate, sliderData) {

  if (![KEY_LEFT, KEY_RIGHT].includes(e.keyCode)) return

  let currentDate = new Date(date)

  if (e.keyCode === KEY_LEFT) {
    if (currentDate > sliderData.startDate) currentDate.setDate(currentDate.getDate() - 1)
  } else if (e.keyCode === KEY_RIGHT) {
    if (currentDate < sliderData.endDate) currentDate.setDate(currentDate.getDate() + 1)
  }
  updateDate(currentDate)
}

export function handleMouseMove(e, mousePos, setMousePos, setStrokeLondon, popup, selectedArea) {
  setMousePos({ x: e.clientX, y: e.clientY })
  const mapContainer = document.querySelector(".map-container")
  const rect = mapContainer.getBoundingClientRect()
  if (mousePos.x > rect.left && mousePos.x < rect.right && mousePos.y > rect.top && mousePos.y < rect.bottom && selectedArea === null) {
    if (!popup) setStrokeLondon(true)
  } else {
    setStrokeLondon(false)
  }
}

export function calculateBgImgData() {
  const mapContainer = document.querySelector(".map-container")
  if (!mapContainer) return
  const rect = mapContainer.getBoundingClientRect()
  return {
    xs: rect.width * 2.397,
    ys: rect.width * 1.339,
    xp: rect.x - (rect.width * 0.685),
    yp: rect.y - (rect.width * 0.32025)
  }
}

export function chartSettings(labels, data, areaName, title) {
  return {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cases',
        backgroundColor: 'rgba(252, 5, 5, 0.35)',
        borderColor: 'rgba(252, 5, 5, 0.8)', // 210, 30, 60
        pointRadius: 0,
        pointHitRadius: 5,
        pointHoverRadius: 0,
        data: data
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true 
          }
        }],
        xAxes: [{
          type: 'time',
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
            maxRotation: 0,
            minRotation: 0
          }
        }]
      },
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 30,
          right: 30,
          top: 10,
          bottom: 10
        }
      },
      title: {
        display: true,
        text: title,
        fontSize: 16,
        padding: 10
      },
      animation: {
        duration: 0
      },
      chartArea: {
        backgroundColor: 'rgb(255, 255,255)'
      },
      plugins: [{
        beforeDraw: function(c) {
           const chartWidth = c.chart.width;
           c.scales['x-axis'].options.ticks.fontSize = chartWidth * 6 / 100; //fontSize: 6% of canvas height
        }
     }]
    }
  }
}

export function getBoroughSummaryData(areaNameUntrim, caseDataArr) {

  const areaName = trimArea(areaNameUntrim)

  if (!caseDataArr || !areaName) return { population: "NaN", totalCases: "NaN", totalDeaths: "NaN" }
  let population, totalCases, totalDeaths

  if (areaName === "London") {
    population = Object.values(boroughPopulations).reduce((acc, val) => acc + val, 0)
    totalCases = caseDataArr.reduce((acc, date) => acc + date.data.reduce((acc2, area) => acc2 + area.cases, 0), 0)
    totalDeaths = caseDataArr.reduce((acc, date) => acc + date.data.reduce((acc2, area) => acc2 + area.deaths, 0), 0)
  } else {
    population = boroughPopulations[areaName]
    totalCases = caseDataArr.reduce((acc, date) => acc + date.data.filter(area => area.name === areaName)[0].cases, 0)
    totalDeaths = caseDataArr.reduce((acc, date) => acc + date.data.filter(area => area.name === areaName)[0].deaths, 0)
  }

  return { population, totalCases, totalDeaths }
}

export function getBoroughLatestData(areaNameUntrim, caseData, sliderData) {
  const areaName = trimArea(areaNameUntrim)
  const date = sliderData.endDate
  const tier = 4 // Create tier dataset
  let cases, deaths

  if (areaName === "London") {

  } else {
    cases = caseData[sliderData.endDate][areaName].cases
    deaths = caseData[sliderData.endDate][areaName].deaths
  }
  return { date, cases, deaths, tier }
}

export function numberWithCommas(x) {
  if (x === null) return null
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function trimArea(selectedArea) {
  return selectedArea.replace(" 2", "")
}

export function casesPerHundredThousand(casesInArea, areaName) {
  const decimalPlaces = 0
  return Math.round((casesInArea * (10 ** decimalPlaces)) / (boroughPopulations[trimArea(areaName)] / 100000)) / (10 ** decimalPlaces)
}

export function bp(arr) {
  const mediaQuery = {}
  if (![null, undefined].includes(arr[0])) mediaQuery.base = arr[0] // You always need base
  if (![null, undefined].includes(arr[1])) mediaQuery.tablet = arr[1]
  if (![null, undefined].includes(arr[2])) mediaQuery.laptop = arr[2]
  return mediaQuery
}