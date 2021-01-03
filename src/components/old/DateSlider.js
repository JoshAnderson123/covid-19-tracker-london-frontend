import React, {useEffect, useRef} from 'react'
import { pure } from 'recompose';
import {formatDate} from '../../util'

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

  function slideTest(e) {
    if (!mousePress) return
    const rect = slider.current.getBoundingClientRect()
    let selectedDateID = Math.round(((e.clientX - rect.left) / (slider.current.offsetWidth)) * sliderData.dateSpan)
    if (selectedDateID > sliderData.dateSpan - 1) selectedDateID = sliderData.dateSpan - 1
    if (selectedDateID < 0) selectedDateID = 0
    const selectedDate = new Date(sliderData.startDate)
    selectedDate.setDate(selectedDate.getDate() + selectedDateID)
    updateDate(formatDate(selectedDate))
  }

  return (
    <div className="date-slider-container flex-center" onMouseMove={e => slideTest(e)}>
      <div className="date-slider">
        <div className="slide-thumb" style={{ left: calculateDateThumbOffset() }}></div>
      </div>
    </div>
  )
}

export default pure(DateSlider)
