import React, { useState } from 'react'
import '../../css/Cards.css'
import DateSlider from './DateSlider'
import LondonMap from './LondonMap'
import MapStats from './MapStats'
import CasesTooltip from './CasesTooltip'
import {handleMouseMove2} from '../../util'

export default function MapCard({ sliderData, date, updateDate, cases, selectedArea, setSelectedArea, caseData }) {

  let [mousePress, setMousePress] = useState(false)
  let [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  return (
    <div
      className="card-container flex-v-sb" id="map-card"
      onMouseMove={e => handleMouseMove2(e, setMousePos, "mouse")}
      // onTouchMove={e => handleMouseMove2(e, setMousePos, "touch")}
      onMouseDown={e => setMousePress(true)}
      onTouchStart={e => setMousePress(true)}
      onMouseUp={e => setMousePress(false)}
      onTouchEnd={e => setMousePress(false)}
    >
      <div className="card-title" id="map-title">Map</div>
      <DateSlider sliderData={sliderData} date={date} updateDate={updateDate} mousePress={mousePress} />
      <LondonMap cases={cases} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      <MapStats caseData={caseData} date={date} selectedArea={selectedArea} />
      {(selectedArea && selectedArea !== "London" && cases.length > 0) ? <CasesTooltip mousePos={mousePos} cases={cases} selectedArea={selectedArea} /> : null}
    </div>
  )
}
