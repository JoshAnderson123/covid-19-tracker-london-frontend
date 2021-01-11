import React from 'react'
import '../css/LondonMap.css'
import { pathData } from '../config'
import { trimArea } from '../util'

export default function MapHighlight({ area, type }) {

  const doubleArea = ["Hackney and City of London", "Barking and Dagenham"].includes(trimArea(area)) ? `${trimArea(area)} 2` : false

  return (
    <svg
      version="1.1"
      className={`area-highlight-${type} stretch`}
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      x="0px" y="0px" viewBox="0 0 756 606.7"
    >
      <path d={pathData[trimArea(area)]} />
      {doubleArea ? <path d={pathData[doubleArea]} /> : null}
    </svg>
  )
}