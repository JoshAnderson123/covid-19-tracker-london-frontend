import React from 'react'
import '../../css/SideBar.css'
import icon from "../../media/virus-icon.svg"

export default function SideBar() {
  return (
    <div className="sidebar-container flex-v-start">
      <div className="virus-icon">
        <img src={icon} alt="virus icon" className="size-of-parent" />
      </div>
      <div className="sidebar-title sidebar-text ta-center" style={{marginTop: "40px"}}>Covid-19 Tracker London</div>
      <div className="font-medium sidebar-text ta-center" style={{marginTop: "40px"}}>Imperial College London</div>
      <div className="font-medium-small sidebar-text ta-center" style={{marginTop: "40px"}}>Josh Anderson</div>
      <div className="font-medium-small sidebar-text ta-center">Design Engineering</div>
      <div className="font-medium-small sidebar-text ta-center">Sensing and IoT</div>
      {/* <div className="font-medium-small sidebar-text ta-center" style={{marginTop: "40px"}}>Last Updated:</div>
      <div className="font-medium-small sidebar-text ta-center">Jan 3rd, 2020</div> */}
    </div>
  )
}
