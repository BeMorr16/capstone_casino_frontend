// import React from 'react'

import { useNavigate } from "react-router-dom"

export default function Casino() {
  const navigate = useNavigate();
  //set table chips and totalchips 
  return (
    <div>
      <button onClick={() => navigate('/blackjack')}>Blackjack</button>
      <button onClick={() => navigate('/roulette')}>Roulette</button>
      <button onClick={() => navigate('/slots')}>Slots</button>
      <button onClick={() => navigate('/warehouse')}>Warehouse</button>
    </div>
  )
}
