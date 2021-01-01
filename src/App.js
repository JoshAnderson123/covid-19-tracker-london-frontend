import './css/App.css';
import axios from "axios";
import { useState, useEffect } from 'react'
import { caseDataArrToDict, handleKeyPress, handleMouseMove, formatDate, formatReadableDate, calculateBgImgData } from './util'
import LondonMap from './LondonMap'
import CasesTooltip from './CasesTooltip';
import DateSlider from './DateSlider';
import CasesChart from './CasesChart';
import BackgroundImg from './BackgroundImg';


let caseData, caseDataArr

function App() {

  let [date, setDate] = useState("2020-12-10")
  let [cases, setCases] = useState([])
  let [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  let [selectedArea, setSelectedArea] = useState()
  let [sliderData, setSliderData] = useState({})
  let [strokeLondon, setStrokeLondon] = useState(false)
  let [mousePress, setMousePress] = useState(false)
  let [popup, setPopup] = useState(false)
  let [bgImgData, setBgImgData] = useState({xs: 0, ys: 0, xp: 0, yp: 0})

  useEffect(() => {
    window.addEventListener('resize', () => setBgImgData(calculateBgImgData()));
    axios.get("http://localhost:8080/getCaseData").then(res => {
      caseDataArr = res.data
      caseData = caseDataArrToDict(res.data)
      setCases(caseData[date])
      document.getElementById("page-container").focus();
      return axios.get("http://localhost:8080/getConfigData")
    }).then(res => {
      const startDate = new Date(res.data[0].startDate)
      const endDate = new Date(res.data[0].endDate)
      const dateSpan = Math.round((endDate - startDate) / (24 * 60 * 60 * 1000))
      setSliderData({ startDate, endDate, dateSpan })
      setBgImgData(calculateBgImgData())
    })
    // eslint-disable-next-line
  }, [])

  function updateDate(currentDate) {
    setDate(formatDate(currentDate))
    setCases(caseData[formatDate(currentDate)])
  }

  return (
    <>
      <div
        id="page-container"
        className="flex-center"
        tabIndex="0"
        onKeyDown={e => handleKeyPress(e, date, updateDate, sliderData)}
        onMouseMove={e => handleMouseMove(e, mousePos, setMousePos, setStrokeLondon, popup, selectedArea)}
        onMouseDown={e => setMousePress(true)}
        onMouseUp={e => setMousePress(false)}
      >
        <BackgroundImg bgImgData={bgImgData} />
        {/* <div className="date-label">{`${formatReadableDate(date)}`}</div> */}
        {/* <DateSlider sliderData={sliderData} date={date} updateDate={updateDate} mousePress={mousePress} /> */}
        <LondonMap cases={cases} selectedArea={selectedArea} setSelectedArea={setSelectedArea} strokeLondon={strokeLondon} popup={popup} setPopup={setPopup} />
        {((selectedArea || strokeLondon) && !popup) ? <CasesTooltip mousePos={mousePos} cases={cases} selectedArea={selectedArea} /> : null}
        {popup ? <CasesChart caseDataArr={caseDataArr} selectedArea={selectedArea} strokeLondon={strokeLondon} setPopup={setPopup} /> : null}
      </div>
    </>
  );
}

export default App;
