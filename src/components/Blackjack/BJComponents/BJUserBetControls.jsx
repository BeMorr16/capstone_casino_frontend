import useStore from "../BJstore/BJstore"
import { handleSubmit } from "../BJutils/BJgameUtils";
import BJButton from "./BJButton"

export default function BJUserBetControls({ chipCount, setChipCount, dealersCardsRef, deckRef, handleEndOfGame, playerCountRef, playerCardsRef}) {
    const { setBetAmount, previousBet, betAmount, isHandComplete, setIsDealersTurn, setIsHandComplete, setLockedBet, randomizedDecks, setPlayersCards, setDealersCards, setRandomizedDecks, setIsBlackjack } = useStore((state) => ({
        setBetAmount: state.setBetAmount,
        previousBet: state.previousBet,
        betAmount: state.betAmount,
        isHandComplete: state.isHandComplete,
        setIsDealersTurn: state.setIsDealersTurn,
        setIsHandComplete: state.setIsHandComplete,
        setLockedBet: state.setLockedBet,
        randomizedDecks: state.randomizedDecks,
        setPlayersCards: state.setPlayersCards,
        setDealersCards: state.setDealersCards,
        setRandomizedDecks: state.setRandomizedDecks,
        setIsBlackjack: state.setIsBlackjack,
    }));
  return (
    <div className="blackjackUserControls">
          <div className="BJButtonsContainer">
            {[5, 25, 50, 100, 500, 1000, 5000].map((amount) => {
              return  <BJButton setBetAmount={setBetAmount} key={amount} num={amount} chipCount={chipCount} />
            })}
          </div>
          <form onSubmit={(e)=>  handleSubmit(e, setIsDealersTurn, setIsHandComplete, setLockedBet, betAmount, randomizedDecks,
                setPlayersCards, setDealersCards, setRandomizedDecks, setBetAmount, setIsBlackjack, dealersCardsRef, deckRef,
                handleEndOfGame, playerCountRef, playerCardsRef)}>
            <div className="betControls">
              <button disabled={!isHandComplete || previousBet < 1 || previousBet > chipCount}
                onClick={() => setBetAmount(() => previousBet)}>
                SAME BET
              </button>
              <button disabled={!isHandComplete || betAmount < 1 || betAmount > chipCount}>
                BET
              </button>
              <button type="button" disabled={!isHandComplete}
                onClick={() => setBetAmount(() => 0)}>
                CLEAR
              </button>
              <button disabled={chipCount < 1 || !isHandComplete}
                onClick={() => setBetAmount(() => chipCount)} type="button" >
                ALL IN
              </button>
            </div>
          </form>
          <div className="BJChipCountContainer">
            <h2 className="BJChipCountHeader">CHIPS</h2>
            <div className="BJChipCount">{chipCount - betAmount}</div>
          </div>
        </div>
  )
}
