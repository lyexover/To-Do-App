import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './login'
import Home from './Home'
import Signup from './Signup'
import Piechart from './PieChart'
import {categoriesLoader} from './Categories'
import List from './List'
import { listLoader } from './List'
import AddTaskForm from './AddTaskForm'
import AddCategoryForm from './AddCategoryForm'
import BarChart from './BarChart'
import  { ChartOneLoader } from './ChartOne'
import { ChartTwoLoader } from './ChartTwo'
import RadarChart , {RadarLoader} from './RadarChart'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'
import TasksPerDay from './TasksPerDay'
import {tasksPerDayLoader} from './TasksPerDay'
import TodoAppFeatures from './TodoAppFeatures'
import AboutUs from './AboutUs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path : '/features', 
    element : <TodoAppFeatures/>
  },
  {
    path : '/aboutus', 
    element : <AboutUs/>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: '/home/:userID',
        element: <Home />,
        loader: categoriesLoader,
        children: [
          {
            index: true,
            element: <Dashboard />
          },
          {
            path: '/home/:userID/barChart/chart/:categoryID',
            element: <BarChart />,
            loader: ChartOneLoader
          },
          {
            path: 'pieChart/chart',
            element: <Piechart />,
            loader: ChartTwoLoader
          },
          {
            path: 'radarChart',
            element: <RadarChart />,
            loader: RadarLoader
          },
          {
            path: 'addCategory',
            element: <AddCategoryForm />
          },
          {
            path: 'category/:categoryID',
            element: <List />,
            loader: listLoader,
            children: [
              {
                path: 'addTask',
                element: <AddTaskForm />
              }, 
              {
                path: ':date',
                element: <TasksPerDay />, 
                loader : tasksPerDayLoader
              }
            ]
          }
        ]
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
