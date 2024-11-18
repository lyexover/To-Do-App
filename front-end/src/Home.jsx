import Categories from "./Categories.jsx"
import { Outlet } from "react-router-dom"
import './css/home.css'

export default function Home(){
    return (
        <div className="home-container">
            <div className="sidebar">
                 <h1>TaskHive</h1>
                  <Categories />
            </div>
            <Outlet className='home-main' />
        </div>
    )
}

