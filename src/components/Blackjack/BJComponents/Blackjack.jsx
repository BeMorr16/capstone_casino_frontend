import { useRef, useState } from "react";
import "./BJ.css";
import useStore from "../BJstore/BJstore";
import { sendTransaction } from "../BJutils/BJgameUtils";
import { useMutation } from "@tanstack/react-query";
import { addTransaction } from "../../Utils/APIRequests";
import cardCount from "../BJutils/cardCount";
import useUserState from "../../../store/store";
import { useNavigate } from "react-router-dom";
import BJCardSection from "./BJCardSection";
import BJTurnControls from "./BJTurnControls";
import BJUserBetControls from "./BJUserBetControls";
import BJnavigations from "./BJnavigations";

export default function Blackjack() {
  const {
    randomizedDecks,
    betAmount,
    lockedBet,
    previousBet,
    dealerCount,
    isBlackjack,
    isPlayerBusted,
    isHandComplete,
    winner,
    setRandomizedDecks,
    setPreviousBet,
    setDealersCards,
    setIsBlackjack,
    setWinner,
    resetGame,
    reshuffleDecks,
  } = useStore((state) => ({
    randomizedDecks: state.randomizedDecks,
    betAmount: state.betAmount,
    lockedBet: state.lockedBet,
    previousBet: state.previousBet,
    dealerCount: state.dealerCount,
    isBlackjack: state.isBlackjack,
    isPlayerBusted: state.isPlayerBusted,
    isHandComplete: state.isHandComplete,
    winner: state.winner,
    setRandomizedDecks: state.setRandomizedDecks,
    setPreviousBet: state.setPreviousBet,
    setDealersCards: state.setDealersCards,
    setIsBlackjack: state.setIsBlackjack,
    setWinner: state.setWinner,
    resetGame: state.resetGame,
    drawCards: state.drawCards,
    reshuffleDecks: state.reshuffleDecks,
  }));
  const [showWinner, setShowWinner] = useState(false);
  const dealerCountRef = useRef(0);
  const dealersCardsRef = useRef([]);
  const deckRef = useRef(randomizedDecks);
  const playerCountRef = useRef(0);
  const playerCardsRef = useRef([]);
  const transactionMutation = useMutation({
    mutationFn: addTransaction,
  });
  const navigate = useNavigate();
  const { tableChips, isLoggedIn, adjustTableChips } = useUserState();
  const [chipCount, setChipCount] = useState(() => {
    if (isLoggedIn) {
      if (tableChips > 0) {
        return tableChips;
      } else if (tableChips === 0) {
        navigate("/casino");
        return 0;
      }
    }
    return 1000;
  });

  function dealerHitAgain() {
    const [drawnDealerCard, ...remainingDeck] = deckRef.current;
    setDealersCards((prev) => {
      const newCards = [...prev, drawnDealerCard];
      dealersCardsRef.current = newCards;
      return newCards;
    });
    deckRef.current = remainingDeck;
    setRandomizedDecks(() => remainingDeck);
    updatedDealerCount();
  }

  function updatedDealerCount() {
    const allCards = [...dealersCardsRef.current];
    const total = cardCount(allCards);
    dealerCountRef.current = total;
    dealersCardsRef.current = allCards;
  }

  function handleDealersTurn() {
    if (dealerCountRef.current < 17 && dealerCount < 17 && !isPlayerBusted && !isBlackjack) {
      setTimeout(() => {
        dealerHitAgain();
        handleDealersTurn();
      }, 500);
    } else {
      handleEndOfGame();
    }
  }

  function handleEndOfGame() {
    const playerCountToCompare = playerCountRef.current;
    const dealerCountToCompare = dealerCount > dealerCountRef.current ? dealerCount : dealerCountRef.current;
    const bet = useStore.getState().lockedBet;
    if (playerCardsRef.current.length === 2 && playerCountRef.current === 21) {
      setWinner(`Player wins ${bet * 2.5} with Blackjack!`);
      setChipCount((prev) => prev + bet * 2.5);
      sendTransaction(true, bet * 1.5, transactionMutation);
      adjustTableChips(bet * 1.5);
    } else if (isPlayerBusted || playerCountToCompare > 21) {
      setWinner("Busted! Dealer wins");
      sendTransaction(false, bet, transactionMutation);
      adjustTableChips(-bet);
    } else if (dealerCountToCompare > 21) {
      setWinner(`Player wins ${bet * 2}!`);
      setChipCount((prev) => prev + bet * 2);
      sendTransaction(true, bet, transactionMutation);
      adjustTableChips(bet);
    } else if (dealerCountToCompare >= 17) {
      if (playerCountToCompare > dealerCountToCompare) {
        setWinner(`Player wins ${bet * 2}!`);
        setChipCount((prev) => prev + lockedBet * 2);
        sendTransaction(true, bet, transactionMutation);
        adjustTableChips(bet);
      } else if (playerCountToCompare < dealerCountToCompare) {
        setWinner("Dealer wins!");
        sendTransaction(false, bet, transactionMutation);
        adjustTableChips(-bet);
      } else if (playerCountToCompare === dealerCountToCompare) {
        setWinner("Push");
        setChipCount((prev) => prev + bet);
        sendTransaction(false, 0, transactionMutation);
      }
    }
    setShowWinner(true);
    setPreviousBet(lockedBet);
    setTimeout(() => {
      setShowWinner(false);
    }, 1500);
    setTimeout(() => {
      resetGame();
      dealerCountRef.current = 0;
      dealersCardsRef.current = [];
      playerCardsRef.current = [];
      playerCountRef.current = 0;
      setIsBlackjack(false);
      if (deckRef.current.length < 30) {
        reshuffleDecks();
      }
    }, 2500);
  }

  return (
    <>
      <div className="BJBody">
        <div className="blackjackTopOuterContainer">
          {showWinner && <h2 className="BJWinnerDisplay">{winner}</h2>}
          <div className="blackjackMainSection">
            <section className="BJTableMinSection">
              <h3 className="BJTableMin">Table minimum $5</h3>
            </section>
            <BJCardSection />
            {!isHandComplete && (
              <BJTurnControls chipCount={chipCount} setChipCount={setChipCount} playerCardsRef={playerCardsRef}
                playerCountRef={playerCountRef} deckRef={deckRef} handleDealersTurn={handleDealersTurn}
                handleEndOfGame={handleEndOfGame} /> )}
          </div>
        </div>
        <BJUserBetControls chipCount={chipCount} setChipCount={setChipCount} dealersCardsRef={dealersCardsRef}
          deckRef={deckRef} handleEndOfGame={handleEndOfGame} playerCountRef={playerCountRef}
          playerCardsRef={playerCardsRef} />
        {winner && (
          <div className="BJPreviousBet">
            <h2>Previous Bet:</h2>
            <p>{winner}</p>
            <p>wagered: {previousBet}</p>
          </div>
        )}
        <div className="BJbetAmountBeforeHand">
          {betAmount > 0 && <h3>{betAmount}</h3>}
              </div>
              <BJnavigations/>
      </div>
    </>
  );
}