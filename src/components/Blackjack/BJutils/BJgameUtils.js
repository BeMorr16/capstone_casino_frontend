import useUserState from "../../../store/store";
import useStore from "../BJstore/BJstore";
import cardCount from "./cardCount";

  
  
export function handleStand(setIsDealersTurn, handleDealersTurn) {
  setIsDealersTurn(true);
  handleDealersTurn();
}

export function handleInsurance( insuranceRef, handleEndOfGame) {
  insuranceRef.current = true;
  handleEndOfGame();
}
  
  export function handleHit(playerCardsRef, deckRef, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleEndOfGame, playerCountRef) {
    const [drawnUserCard, ...remainingDeck] = deckRef.current;
    if (!drawnUserCard) {
      return;
  }
    setPlayersCards((prev) => {
      const newCards = [...prev, drawnUserCard];
      const newCount = cardCount(newCards);
      playerCountRef.current = newCount;
      playerCardsRef.current = newCards;
      if (newCount > 21) {
        setIsPlayerBusted(true);
        handleEndOfGame();
      }
      return newCards;
    });
    deckRef.current = remainingDeck;
    setRandomizedDecks(() => remainingDeck);
  }

  export function handleDouble(deckRef, lockedBet, setChipCount, handleHit, setIsDealersTurn, setLockedBet, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleDealersTurn, handleEndOfGame, playerCardsRef, playerCountRef){
    setChipCount((prev) => prev - lockedBet);
    setLockedBet(lockedBet * 2);
    handleHit(playerCardsRef, deckRef, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleEndOfGame, playerCountRef)
    if (playerCountRef.current < 22) {
      handleStand(setIsDealersTurn, handleDealersTurn);
    }
  }
  
  export function handleSubmit(e, setIsDealersTurn, setIsHandComplete, setLockedBet, betAmount, setChipCount, randomizedDecks, setPlayersCards, setDealersCards, setRandomizedDecks, setBetAmount, setIsBlackjack, dealersCardsRef, deckRef, handleEndOfGame, playerCountRef, playerCardsRef) {
    e.preventDefault();
    setIsDealersTurn(false);
    setIsHandComplete(false);
    setLockedBet(betAmount);
    setChipCount((prev) => prev - betAmount);
      setBetAmount(() => 0);
    const drawnUserCards = randomizedDecks.slice(0, 2);
    setPlayersCards((prev) => [...prev, ...drawnUserCards]);
    const drawnHouseCards = randomizedDecks.slice(2, 4);
    setDealersCards((prev) => {
      const newCards = [...prev, ...drawnHouseCards];
      dealersCardsRef.current = newCards;
      return newCards;
    });
    const remainingDeck = randomizedDecks.slice(4);
    deckRef.current = remainingDeck;
    setRandomizedDecks(()=> remainingDeck);

    let userCount = cardCount(drawnUserCards);
    playerCountRef.current = userCount;
    playerCardsRef.current = drawnUserCards
    if (drawnUserCards.length === 2 && userCount === 21) {
      setIsBlackjack(true);
      handleEndOfGame()
    }
  }
  

export function sendTransaction(bool, lockedBet, transactionMutation, insuranceRef = false) {
  let money;
  if (!bool && lockedBet !== 0) {
    money = lockedBet * (-1)
  } else {
    money = lockedBet
  }
  let result = `Player: ${useStore.getState().playerCount}, Dealer: ${useStore.getState().dealerCount}`;
  if (insuranceRef) {
    result = "Insurance taken"
  }
  const transaction = {
    id: useUserState.getState().id,
    game: 'blackjack',
    win_loss: bool,
    money: money,
    result: result
  };
  if (useUserState.getState().isLoggedIn) {
    transactionMutation.mutate(transaction)
  } else {
    console.log("not logged in")
  }
}
