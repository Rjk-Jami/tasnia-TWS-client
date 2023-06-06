import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './provider/ThemeProvider/ThemeProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <HelmetProvider>
   <ThemeProvider>
   <RouterProvider router={router} />
   </ThemeProvider>
   </HelmetProvider>
  </React.StrictMode>,
)
