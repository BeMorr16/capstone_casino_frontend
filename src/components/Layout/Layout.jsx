// import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "./layout.css"
import useUserState from '../../store/store'

export default function Layout() {
  const { returnChipsToTotal, isLoggedIn } = useUserState();

  function resetTableChips() {
    returnChipsToTotal();
  }

  return (
      <div className='Layout'>
          <nav>
        <div className="nav-links">
          {!isLoggedIn ? (
          <Link to='/' onClick={resetTableChips}>
          Home
            </Link> 
          ) : (
              <Link to='/warehouse' onClick={resetTableChips}>
                Warehouse
              </Link>
          )}

          <div className="dropdown">
          <Link to="#" className="dropbtn">How to Play</Link>
          <div className="dropdown-content">
            <Link to="/">Story</Link>
            <Link to="/howtoplay/blackjack" onClick={resetTableChips}>Blackjack</Link>
            <Link to="/howtoplay/roulette" onClick={resetTableChips}>Roulette</Link>
            <Link to="/howtoplay/slots" onClick={resetTableChips}>Slots</Link>
          </div>
          </div>
          

          <Link to='/leaderboards' onClick={resetTableChips}>Leaderboards</Link>
          <Link to='/casino' onClick={resetTableChips}>Casino</Link>
          <Link to='/account' onClick={resetTableChips}> Login</Link>
        </div>  
      </nav>
      

          <Outlet />
          <footer>
              foot
          </footer>
    </div>
  )
}
