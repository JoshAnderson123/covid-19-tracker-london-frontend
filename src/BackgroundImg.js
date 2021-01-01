import React from 'react'
import backgroundImage from './media/London_satellite_photo3.jpg'

export default function BackgroundImg({ bgImgData }) {
  
  return (
    <div className="fill-parent">
      <img
      src={backgroundImage}
      alt="Satellite background"
      className="satellite-image-background usn"
      style={{
        width: `${bgImgData.xs}px`,
        height: `${bgImgData.ys}px`,
        left: `${bgImgData.xp}px`,
        top: `${bgImgData.yp}px`,
      }} />
    </div>
  )
}
