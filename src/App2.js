import React, { useState, useEffect } from 'react'
import './css/App2.css'
import axios from 'axios'
import { caseDataArrToDict, handleKeyPress, formatDate } from './util'
import { SERVER_URL } from './config'
import SideBar from './components/SideBar'
import MapCard from './components/MapCard'
import InfoCard from './components/InfoCard'
import Loading from './components/Loading'

let caseData, caseDataArr

export default function App2() {

  let [date, setDate] = useState("2020-12-10")
  let [cases, setCases] = useState([])
  let [selectedArea, setSelectedArea] = useState("London")
  let [sliderData, setSliderData] = useState({})
  let [loading, setLoading] = useState(true)


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
      setLoading(false)
    })
    // eslint-disable-next-line
  }, [])

  function updateDate(currentDate) {
    setDate(formatDate(currentDate))
    setCases(caseData[formatDate(currentDate)])
  }

  function renderApp() {
    if (loading) return <Loading />
    return <>
      <SideBar />
      <div
        className="content-container"
        tabIndex="0"
        onKeyDown={e => handleKeyPress(e, date, updateDate, sliderData, setSelectedArea)}
      >
        <MapCard
          sliderData={sliderData}
          date={date}
          updateDate={updateDate}
          cases={cases}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
          caseData={caseData}
        />
        <InfoCard
          caseDataArr={caseDataArr}
          selectedArea={selectedArea}
          sliderData={sliderData}
          caseData={caseData}
        />
      </div>
    </>
  }

  return (
    <div className="page-container">
      {renderApp()}
    </div>
  )
}
