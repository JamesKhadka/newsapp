import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {


  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-white ">
        <div className="container-fluid " >
          <Link className="navbar-brand" to="/">CurrentWave</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-black" aria-current="page" to="/">Home</Link>
              </li>


              <li className="nav-item ">
                <Link className="nav-link text-black" to="/Business">Business</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/Entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/General">General</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/Health">Health</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/Science">Science</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/Sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-black" to="/Technology">Technology</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>

    </div>
  )

}

export default Navbar
