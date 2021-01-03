import React from 'react'
import '../../css/Cards.css'
import DateSlider from './DateSlider'
import LondonMap from './LondonMap'
import MapStats from './MapStats'
import CasesTooltip from './CasesTooltip'

export default function MapCard({ sliderData, date, updateDate, mousePress, cases, selectedArea, setSelectedArea, caseData, mousePos }) {
  return (
    <div className="card-container flex-v-sb" id="map-card">
      <div className="card-title">Map</div>
      <DateSlider sliderData={sliderData} date={date} updateDate={updateDate} mousePress={mousePress} />
      <LondonMap cases={cases} selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
      <MapStats caseData={caseData} date={date} selectedArea={selectedArea} />
      {(selectedArea && selectedArea !== "London") ? <CasesTooltip mousePos={mousePos} cases={cases} selectedArea={selectedArea} /> : null}
    </div>
  )
}
