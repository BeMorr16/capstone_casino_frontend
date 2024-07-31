// import React from 'react'

import { useNavigate } from "react-router-dom"
import useUserState from "../../store/store";
import { useState } from "react";
import "./Casino.css";
import Door1 from "../Slots/assets/images/DOOR 1.png";
import Door2 from "../Slots/assets/images/DOOR 2.png";
import Door3 from "../Slots/assets/images/DOOR 3.png";

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
    <div className= "Casino-container">
      <form onSubmit={handleTCSubmit}>
      {isLoggedIn && <input type="number"  onChange={handleInputChange} placeholder="How many chips are you bringing"/>}
      <div className = "Casino-Blackjack">
      <button className ="Casino-Button" disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/blackjack')}>
      <img src={Door1} alt="Door 1" className = "Casino-Blackjack-Img"/>
      </button>
      </div>
      <div className = "Casino-Roulette">
      <button className ="Casino-Button" disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/roulette')}>
      <img src={Door2} alt="Door 2" className = "Casino-Roulette-Img"/>
      </button>
      </div>
      <div className = "Casino-Slots">
      <button className ="Casino-Button" disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/slots')}>
      <img src={Door3} alt="Door 3" className = "Casino-Slots-Img"/>
      </button>
      </div>
</form>
    </div>
    </div>
  )
}
