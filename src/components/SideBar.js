import React from 'react'
import '../css/SideBar.css'
import icon from "../media/virus-icon.svg"

export default function SideBar() {
  return (
    <div className="sb-container f-vs">
      <div className="sb-logo">
        <img src={icon} alt="virus icon" />
      </div>
      <div className="sb-title">COVID-19 Tracker London</div>
      <div className="sb-details">
        <div>Josh Anderson</div>
        <div style={{marginTop: "10px"}}>Sensing and IoT</div>
        <div style={{marginTop: "10px"}}>Design Engineering</div>
        <div style={{marginTop: "10px"}}>Imperial College London</div>
      </div>
    </div>
  )
}
