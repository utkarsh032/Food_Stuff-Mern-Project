import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './router/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './context/AuthProvider.jsx'

import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

// TanStack Query
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>,
)

