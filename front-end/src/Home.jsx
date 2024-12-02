import Categories from "./Categories.jsx"
import { Outlet, Link } from "react-router-dom"
import './css/home.css'

export default function Home(){

   function handleClick(){
    localStorage.clear()
   }

    return (
        <div className="home-container">
            <div className="sidebar">
                 <h1>TaskHive</h1>
                  <Categories />
                  <Link onClick={handleClick} className='logout' to={'/'}><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</Link>
            </div>
            <Outlet className='home-main' />
        </div>
    )
}

