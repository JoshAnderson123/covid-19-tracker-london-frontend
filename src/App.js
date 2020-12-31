import './App.css';
import axios from "axios";
import { useState, useEffect } from 'react'
import { caseDataArrToDict, handleKeyPress } from './util'
import LondonMap from './LondonMap'
import CasesTooltip from './CasesTooltip';
import DateSlider from './DateSlider';

let caseData

function App() {

  let [date, setDate] = useState("2020-12-10")
  let [cases, setCases] = useState([])
  let [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  let [selectedArea, setSelectedArea] = useState()

  useEffect(() => {
    axios.get("http://localhost:8080/getData").then(res => {
      caseData = caseDataArrToDict(res.data)
      setCases(caseData[date])
      document.getElementById("page-container").focus();
      return axios.get("http://localhost:8080/getDateSpan")
    }).then(res => {
      console.log("DateSpan: ", res.data)
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="date-label">{`Date: ${date}`}</div>
      <div
        id="page-container"
        tabIndex="0"
        onKeyDown={e => handleKeyPress(e, date, setDate, caseData, setCases)}
        onMouseMove={e => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <DateSlider />
        <LondonMap cases={cases} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
        {selectedArea ? <CasesTooltip mousePos={mousePos} cases={cases} selectedArea={selectedArea} /> : null}
      </div>
    </>
  );
}

export default App;
