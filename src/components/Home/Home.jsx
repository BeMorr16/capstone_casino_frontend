import { useNavigate } from "react-router-dom"
import useUserState from "../../store/store";
// import React from 'react'

export default function Home() {
  const navigate = useNavigate();
  const {setIsMiniGame} = useUserState();

  // console.log(id, userMoney);
  
  function sendToMiniGame() {
    setIsMiniGame(true);
    navigate('/blackjack')
}

  return (
    <>
      <h1>Landing Header</h1>
      <p>Explanation</p>
      <p>More Explanation</p>
      <button onClick={() => navigate('/account')}>Login to start your journey</button>
      <button onClick={() => navigate('/casino')}>Gamble as a guest</button>

      <button onClick={sendToMiniGame}>MiniGame</button>
    </>
  )
}
