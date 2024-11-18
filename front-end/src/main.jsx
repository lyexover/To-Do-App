import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './login'
import Home from './Home'
import Signup from './Signup'
import Dashboard from './Dashboard'
import {categoriesLoader} from './Categories'
import List from './List'
import { listLoader } from './List'
import AddTaskForm from './AddTaskForm'
import AddCategoryForm from './AddCategoryForm'


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
    path : '/home/:userID', 
    element : <Home/> , 
    loader : categoriesLoader ,
    children : [
      {
        index : true ,
        element : <Dashboard/>
      } , 

      {
        path : '/home/:userID/addCategory', 
        element : <AddCategoryForm />
      },

      {
        path : '/home/:userID/category/:categoryID', 
        element : <List />, 
        loader : listLoader, 
        children : [
          {
            path : '/home/:userID/category/:categoryID/addTask',
            element : <AddTaskForm/>
          }
        ]
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
