import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: 'home', element: <Dashboard view="home" /> },
      { path: 'car', element: <Dashboard view="car" /> },
      { path: 'music', element: <Dashboard view="music" /> },
      { path: 'navigation', element: <Dashboard view="navigation" /> },
      { path: 'work', element: <Dashboard view="work" /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
