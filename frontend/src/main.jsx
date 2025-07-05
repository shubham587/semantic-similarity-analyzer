import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#E6F3FF',
      100: '#B3D7FF',
      200: '#80BAFF',
      300: '#4D9EFF',
      400: '#1A81FF',
      500: '#0066E6',
      600: '#0052B3',
      700: '#003D80',
      800: '#00294D',
      900: '#001433',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
) 