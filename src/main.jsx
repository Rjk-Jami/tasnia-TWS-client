import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './provider/ThemeProvider/ThemeProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router'
import AuthProvider from './provider/AuthProvider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <AuthProvider>
   <QueryClientProvider client={queryClient}>
   <HelmetProvider>
   <ThemeProvider>
   <RouterProvider router={router} />
   </ThemeProvider>
   </HelmetProvider>
   </QueryClientProvider>
   </AuthProvider>
  </React.StrictMode>,
)
