// import React from 'react'

import { useNavigate } from "react-router-dom"
import useUserState from "../../store/store";
import { useState } from "react";
import "./Casino.css";
import Arrow from "../Slots/assets/images/arrow.png";

export default function Casino() {
  const navigate = useNavigate();
  const { tableChips, setTableChips, isLoggedIn, userMoney } = useUserState();
  const [tempChips, setTempChips] = useState(0);
  const [destination, setDestination] = useState("");
  //set table chips and totalchips 
  console.log(userMoney, tableChips)
  


  function handleInputChange(e) {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value <= userMoney) {
      setTempChips(value);
    } else {
      console.error('Invalid number');
    }
  }
  
  function handleTCSubmit(e) {
    e.preventDefault();
    setTableChips(tempChips);
    navigate(destination)
  }

  return (
    <div className= "Casino-background">
    <div>
      <form onSubmit={handleTCSubmit}>
      {isLoggedIn && <input type="number"  onChange={handleInputChange} placeholder="How many chips are you bringing"/>}
      <div className = "Casino-Blackjack">
      <button className ="Casino-Button" disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/blackjack')}></button>
      </div>
      <div className = "Casino-Roulette">
      <button className ="Casino-Button" disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/roulette')}></button>
      </div>
      <div className = "Casino-Slots">
      <button className ="Casino-Button" disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/slots')}></button>
      </div>
      <div className = "Casino-WareHouse">
      <button className ="Casino-WareHouse-Button" disabled={tempChips && isLoggedIn} onClick={() => setDestination('/warehouse')}>Warehouse</button>
      <img
            className="Casino-WareHouse-Arrow"
            src={Arrow}
            alt="Slot Machine"
          />
      </div>
</form>
    </div>
    </div>
  )
}
