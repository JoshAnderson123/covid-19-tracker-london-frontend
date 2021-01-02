import React from 'react'
import '../../css/LondonMap.css'
import { pathData } from '../../config'

export default function MapHighlight({ area }) {

  return (
    <svg
      version="1.1"
      className="area-highlight size-of-parent"
      xmlns="http://www.w3.org/2000/svg"
      x="0px" y="0px" viewBox="0 0 756 606.7"
    >
      {area ? <path d={pathData[area]} /> : null}
    </svg>
  )
}
