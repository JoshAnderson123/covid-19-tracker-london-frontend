import React from 'react'

export default function MapLegend() {
  return (
    <div className="map-legend flex-v-start">
      <div className="legend-label">Daily Cases / 100k</div>
      <div className="legend-bar"></div>
      <div className="legend-tick-container flex-sb">
        <div className="legend-tick">0</div>
        <div className="legend-tick">200</div>
        <div className="legend-tick">400</div>
      </div>
    </div>
  )
}
