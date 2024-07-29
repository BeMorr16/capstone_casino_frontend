// import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "./layout.css"

export default function Layout() {
  return (
      <div>
          <nav>
        <div className="nav-links">
          <Link to='/'>
            Home
          </Link>
          {/* or conditionally render */}
          {/* <Link to='/warehouse'>Home</Link> */}


          <div className="dropdown">
          <Link to="#" className="dropbtn">How to Play</Link>
          <div className="dropdown-content">
            <Link to="/">Story</Link>
            <Link to="/howtoplay/blackjack">Blackjack</Link>
            <Link to="/howtoplay/roulette">Roulette</Link>
            <Link to="/howtoplay/slots">Slots</Link>
          </div>
          </div>
          

          <Link to='/leaderboards'>Leaderboards</Link>
          <Link to='/casino'>Casino</Link>
          <Link to='/account'> Login</Link>
        </div>  
      </nav>
      

          <Outlet />
          <footer>
              foot
          </footer>
    </div>
  )
}
