import React from 'react'
import icon from "../../media/virus-icon.svg"

export default function Loading() {
  return (
    <div className="loading-container stretch f-c">
      <img className="loading-image" src={icon} alt="Loading" />
    </div>
  )
}
