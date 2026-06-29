import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import LoginPage3 from './pages/LoginPage3.jsx'
import LoginTestPage from './pages/LoginTestPage.jsx'
import NotFound from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/login3",
        element: <LoginPage3 />
      },
      {
        path: "/loginTest",
        element: <LoginTestPage />
      }
    ]
  },



])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
