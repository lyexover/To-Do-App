import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './login'
import Home from './Home'
import Signup from './Signup'


const router = createBrowserRouter([
  {
    path : '/', 
    element : <LandingPage />
  }, 
  {
    path : '/login', 
    element : <Login />
  }, 
  {
    path : '/signup', 
    element : <Signup/>
  },
  {
    path : '/home', 
    element : <Home/>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
