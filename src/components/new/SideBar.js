import React from 'react'
import '../../css/SideBar.css'
import icon from "../../media/virus-icon.svg"
import { Box, Flex, Image, AspectRatio } from "@chakra-ui/react"
import { bp } from '../../util'

export default function SideBar() {
  return (
    <div className="sb-container f-vs" justify="space-around" align="center" divGrow="0" bgColor="#fff">
      <AspectRatio className="sb-logo" ratio={1} flexShrink="0">
        <Image className="stretch" objectFit="contain" src={icon} alt="virus icon" />
      </AspectRatio>
      <Box className="sb-title">Covid-19 Tracker London</Box>
      <Box className="sb-details">
        <Box>Josh Anderson</Box>
        <Box>Design Engineering</Box>
        <Box>Sensing and IoT</Box>
      </Box>
      {/* <Box className="font-medium-small sidebar-text ta-center" style={{marginTop: "40px"}}>Last Updated:</Box>
      <Box className="font-medium-small sidebar-text ta-center">Jan 3rd, 2020</Box> */}
    </div>
  )
}
