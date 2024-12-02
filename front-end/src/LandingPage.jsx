import { Link } from "react-router-dom"
import './css/LandingPage.css'


export default function LandingPage(){


    return (
       <div>

          <div className="header">
            <h2>TaskHive</h2>

            <div className="right">
            <div className="links">
                <Link to='/features' className="link">Features</Link>
                <Link to='/aboutus' className="link">About Us</Link>
                <Link to='/contact' className="link">Contact Us</Link>
            </div>

            <div className="auth">
              <Link className="link" to='/login'>Log in</Link>
              <Link className="link red" to='/signup'>Start For Free</Link>
            </div>

            </div>
          </div>

          <div className="body">
            <div className="text">
                <h1>Organize your work and life, finally.</h1>
                <p>Welcome to Taskly, your all-in-one to-do list app designed to streamline your productivity.</p>
                <Link className="link" to='/signup'>Start For Free</Link>
            </div>
            <div className="image">
                <img src="../landingpage.png" alt="inside app image" />
            </div>
          </div>
       </div>
    )
}