import React, { useState, useEffect } from 'react'
import './css/App2.css'
import axios from 'axios'
import { caseDataArrToDict, handleKeyPress, formatDate } from './util'
import {SERVER_URL} from './config'
import SideBar from './components/new/SideBar'
import MapCard from './components/new/MapCard'
import InfoCard from './components/new/InfoCard'

let caseData, caseDataArr

export default function App2() {

  let [date, setDate] = useState("2020-12-10")
  let [cases, setCases] = useState([])
  // let [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  let [selectedArea, setSelectedArea] = useState("London")
  let [sliderData, setSliderData] = useState({})
  // let [strokeLondon, setStrokeLondon] = useState(false)


  useEffect(() => {
    axios.get(`${SERVER_URL}/getCaseData`).then(res => {
      caseDataArr = res.data
      caseData = caseDataArrToDict(res.data)
      setCases(caseData[date])
      document.querySelector(".page-container").focus();
      return axios.get(`${SERVER_URL}/getConfigData`)
    }).then(res => {
      const startDate = new Date(res.data[0].startDate)
      const endDate = new Date(res.data[0].endDate)
      const dateSpan = Math.round((endDate - startDate) / (24 * 60 * 60 * 1000))
      setSliderData({ startDate, endDate, dateSpan })
      updateDate(formatDate(endDate))
    })
    // eslint-disable-next-line
  }, [])

  function updateDate(currentDate) {
    setDate(formatDate(currentDate))
    setCases(caseData[formatDate(currentDate)])
  }

  return (
    <div className="page-container">
      <SideBar />
      <div
        className="content-container"
        tabIndex="0"
        onKeyDown={e => handleKeyPress(e, date, updateDate, sliderData)}
        // onMouseMove={e => handleMouseMove(e, mousePos, setMousePos, setStrokeLondon, false, selectedArea)}
        // onTouchMove={e => handleMouseMove(e, mousePos, setMousePos, setStrokeLondon, false, selectedArea)}
        // onMouseDown={e => setMousePress(true)}
        // onTouchStart={e => setMousePress(true)}
        // onMouseUp={e => setMousePress(false)}
        // onTouchEnd={e => setMousePress(false)}
      >
        <MapCard
          sliderData={sliderData}
          date={date}
          updateDate={updateDate}
          // mousePress={mousePress}
          // mousePos={mousePos}
          cases={cases}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          // strokeLondon={strokeLondon}
          caseData={caseData}
        />
        <InfoCard
          caseDataArr={caseDataArr}
          selectedArea={selectedArea}
          sliderData={sliderData}
          caseData={caseData}
        />
      </div>
    </div>
  )
}
