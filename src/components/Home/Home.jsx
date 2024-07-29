import { useNavigate } from "react-router-dom"
// import React from 'react'

export default function Home() {
  const navigate = useNavigate();


  // console.log(id, userMoney);
  

  return (
    <>
      <h1>Landing Header</h1>
      <p>Explanation</p>
      <p>More Explanation</p>
      <button onClick={() => navigate('/account')}>Login to start your journey</button>
      <button onClick={() => navigate('/casino')}>Gamble as a guest</button>
    </>
  )
}
