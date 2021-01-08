import React from 'react'
import '../../css/SideBar.css'
import icon from "../../media/virus-icon.svg"
import { Box, Image, AspectRatio } from "@chakra-ui/react"

export default function SideBar() {
  return (
    <div className="sb-container f-vs">
      <AspectRatio className="sb-logo" ratio={1} flexShrink="0">
        <Image className="stretch" objectFit="contain" src={icon} alt="virus icon" />
      </AspectRatio>
      <Box className="sb-title">Covid-19 Tracker London</Box>
      <Box className="sb-details">
        <Box>Josh Anderson</Box>
        <Box>Design Engineering</Box>
        <Box>Sensing and IoT</Box>
      </Box>
    </div>
  )
}
