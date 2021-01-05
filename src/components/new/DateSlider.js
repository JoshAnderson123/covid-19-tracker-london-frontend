import React, { useEffect, useRef } from 'react'
import '../../css/MapCard.css'
import { pure } from 'recompose';
import { formatDate, formatReadableDate, formatReadableDateShort } from '../../util'

function DateSlider({ sliderData, date, updateDate, mousePress }) {

  const slider = useRef()
  const slideThumb = useRef()

  useEffect(() => {
    slider.current = document.querySelector('.date-slider')
    slideThumb.current = document.querySelector('.date-slider .slide-thumb')
  }, [])

  function calculateDateThumbOffset() {
    if (slider.current !== undefined) {
      const currentDate = new Date(date)
      const dateSpan = sliderData.dateSpan
      const dateId = Math.round((currentDate - sliderData.startDate) / (24 * 60 * 60 * 1000))
      const sliderThumbOffsetPercentage = (dateId / dateSpan) * 100
      return `calc(${sliderThumbOffsetPercentage}% - ${slideThumb.current.offsetWidth / 2}px)`
    } else {
      return "0px"
    }
  }

  function updateDateWithSlider(e, type) {

    const xVal = type === "touch" ? e.touches[0].clientX : e.clientX

    if (!mousePress) return
    const rect = slider.current.getBoundingClientRect()
    let selectedDateID = Math.round(((xVal - rect.left) / (slider.current.offsetWidth)) * sliderData.dateSpan)
    if (selectedDateID > sliderData.dateSpan) selectedDateID = sliderData.dateSpan
    if (selectedDateID < 0) selectedDateID = 0
    const selectedDate = new Date(sliderData.startDate)
    selectedDate.setDate(selectedDate.getDate() + selectedDateID)
    updateDate(formatDate(selectedDate))
  }

  return (
    <div className="date-slider-container flex-center w-100"

      onMouseMove={e => updateDateWithSlider(e, "mouse")}
      onTouchMove={e => updateDateWithSlider(e, "touch")}
    >

      <div className="date-label ">{ window.innerWidth < 700 ? formatReadableDateShort(date) : formatReadableDate(date) }</div>

      <div className="date-slider">
        <div className="slide-thumb" style={{ left: calculateDateThumbOffset() }}></div>
      </div>

      <div className="date-slider-forks"></div>

      <div className="date-slider-label-wrapper flex-sb">
        <div className="slider-fork-label">{formatReadableDate(sliderData.startDate)}</div>
        <div className="slider-fork-label">{formatReadableDate(sliderData.endDate)}</div>
      </div>

    </div>
  )
}

export default pure(DateSlider)
