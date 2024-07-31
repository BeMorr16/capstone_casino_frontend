// import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import "./layout.css"
import useUserState from '../../store/store'

export default function Layout() {
  const { returnChipsToTotal, isLoggedIn, resetUser } = useUserState();

  function resetTableChips() {
    returnChipsToTotal();
  }

  function handleLogout() {
    resetUser();
    window.sessionStorage.removeItem("token");
  }

  return (
      <div className='Layout'>
          <nav className='nav'>
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
              {isLoggedIn && <Link to="/">Story</Link>}
            <Link to="/howtoplay/blackjack" onClick={resetTableChips}>Blackjack</Link>
            <Link to="/howtoplay/roulette" onClick={resetTableChips}>Roulette</Link>
            <Link to="/howtoplay/slots" onClick={resetTableChips}>Slots</Link>
          </div>
          </div>
          

          <Link to='/leaderboards' onClick={resetTableChips}>Leaderboards</Link>
          <Link to='/casino' onClick={resetTableChips}>Casino</Link>
          {isLoggedIn ? (<Link to='/' onClick={handleLogout}>Logout</Link>) : (<Link to='/account' onClick={resetTableChips}> Login</Link>)}
          
        </div>  
      </nav>
      
<main>
        <Outlet />
        </main>
          <footer>
              foot
          </footer>
    </div>
  )
}
