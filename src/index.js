import React from 'react'
import ReactDOM from 'react-dom';
import './css/index.css';
import App2 from './App2';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  tablet: "800px",
  laptop: "1300px",
})

const theme = extendTheme({
  colors: {
    brand: {
      grey: {
        1: "#333"
      },
    },
  },
  breakpoints
})

// console.log(theme)

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App2 />
  </ChakraProvider>,
  document.getElementById('root')
);