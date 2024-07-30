// import React from 'react'

import { useNavigate } from "react-router-dom"
import useUserState from "../../store/store";
import { useState } from "react";

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
    <div>
      <form onSubmit={handleTCSubmit}>
      {isLoggedIn && <input type="number"  onChange={handleInputChange} placeholder="How many chips are you bringing"/>}
      <button disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/blackjack')}>Blackjack</button>
      <button disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/roulette')}>Roulette</button>
      <button disabled={!tempChips && isLoggedIn} onClick={() => setDestination('/slots')}>Slots</button>
      <button disabled={tempChips && isLoggedIn} onClick={() => setDestination('/warehouse')}>Warehouse</button>
</form>
    </div>
  )
}
