import { useEffect, useRef, useState } from "react";
import "./BJ.css";
import BJButton from "./BJButton";
import useStore from "../BJstore/BJstore";
import { handleDouble, handleHit, handleStand, handleSubmit, sendTransaction } from "../BJutils/BJgameUtils";
import { useMutation } from "@tanstack/react-query";
import { addTransaction } from "../../Utils/APIRequests";
import cardCount from "../BJutils/cardCount";
import useUserState from "../../../store/store";

export default function Blackjack() {
    const {
        randomizedDecks,
        chipCount,
        betAmount,
        lockedBet,
        previousBet,
        dealersCards,
        dealerCount,
        playersCards,
        playerCount,
        isBlackjack,
        isPlayerBusted,
        isDealersTurn,
        isHandComplete,
        winner,
        setRandomizedDecks,
        setChipCount,
        setBetAmount,
        setLockedBet,
        setPreviousBet,
        setDealersCards,
        setPlayersCards,
        setIsPlayerBusted,
        setIsDealersTurn,
        setIsHandComplete,
        setIsBlackjack,
        setWinner,
        resetGame,
        reshuffleDecks
    } = useStore((state) => ({
        randomizedDecks: state.randomizedDecks,
        chipCount: state.chipCount,
        betAmount: state.betAmount,
        lockedBet: state.lockedBet,
        previousBet: state.previousBet,
        dealersCards: state.dealersCards,
        dealerCount: state.dealerCount,
        playersCards: state.playersCards,
        playerCount: state.playerCount,
        isBlackjack: state.isBlackjack,
        isPlayerBusted: state.isPlayerBusted,
        isDealersTurn: state.isDealersTurn,
        isHandComplete: state.isHandComplete,
        winner: state.winner,
        setRandomizedDecks: state.setRandomizedDecks,
        setChipCount: state.setChipCount,
        setBetAmount: state.setBetAmount,
        setLockedBet: state.setLockedBet,
        setPreviousBet: state.setPreviousBet,
        setDealersCards: state.setDealersCards,
        setPlayersCards: state.setPlayersCards,
        setIsPlayerBusted: state.setIsPlayerBusted,
        setIsDealersTurn: state.setIsDealersTurn,
        setIsHandComplete: state.setIsHandComplete,
        setIsBlackjack: state.setIsBlackjack,
        setWinner: state.setWinner,
        resetGame: state.resetGame,
        drawCards: state.drawCards,
        reshuffleDecks: state.reshuffleDecks
    }));
    const [showWinner, setShowWinner] = useState(false)
    const dealerCountRef = useRef(0);
    const dealersCardsRef = useRef([]);
    const deckRef = useRef(randomizedDecks);
    const playerCountRef = useRef(0);
    const playerCardsRef = useRef([]);
    const transactionMutation = useMutation({
        mutationFn: addTransaction
    })


    const { tableChips, isLoggedIn, userMoney, adjustTableChips } = useUserState();



    useEffect(() => {
    if (isLoggedIn) {
        setChipCount(() => useUserState.getState().tableChips || 0);
    } else {
        setChipCount(() => 1000);
    }
    }, [setChipCount, isLoggedIn])
    

    console.log(userMoney, tableChips)
    
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
        const allCards = [...dealersCardsRef.current]
        const total = cardCount(allCards)
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
        if (playerCardsRef.current.length === 2 && playerCountRef.current === 21) {
            setWinner(`Player wins ${lockedBet * 2.5} with Blackjack!`)
        } else if (isPlayerBusted || playerCountToCompare > 21) {
            setWinner("Busted! Dealer wins");
            sendTransaction(false, lockedBet, transactionMutation)
            adjustTableChips((-lockedBet))
        } else if (dealerCountToCompare > 21) {
            setWinner(`Player wins ${lockedBet * 2}!`);
            setChipCount((prev) => prev + lockedBet * 2);
            sendTransaction(true, lockedBet, transactionMutation)
        } else if (dealerCountToCompare >= 17) {
            if (playerCountToCompare > dealerCountToCompare) {
                setWinner(`Player wins ${lockedBet * 2}!`);
                setChipCount((prev) => prev + lockedBet * 2);
                sendTransaction(true, lockedBet, transactionMutation)
            } else if (playerCountToCompare < dealerCountToCompare) {
                setWinner("Dealer wins!");
                sendTransaction(false, lockedBet, transactionMutation)
            } else if (playerCountToCompare === dealerCountToCompare) {
                setWinner("Push");
                setChipCount((prev) => prev + lockedBet);
                sendTransaction(false, 0, transactionMutation)
            }
        }
        setShowWinner(true)
        setPreviousBet(lockedBet);
        setTimeout(() => {
            setShowWinner(false)
        }, 1000)
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
        }, 2000)
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
                    <div className="blackjackCardSection">
                    <section className="BJDealerSection">
                                {dealersCards.length > 0 && (isDealersTurn ? <div>{dealerCount}</div> : <div>{dealersCards[0].weight}</div>)}
                        {dealersCards.map((card, index) => {
                            const isSecondChild = index === 1;
                            return (
                                <div key={index}>
                                    <img
                                        src={
                                            isDealersTurn || !isSecondChild
                                                ? card.frontImage
                                                : card.backImage
                                        }
                                        className={`blackjackImages ${!isSecondChild || isDealersTurn ? "" : "BJsecondCard"
                                            }`}
                                    />
                                </div>
                            );
                        })}
                    </section>

                    <section className="BJUserSection">
                        {playersCards.length > 0 && <div>{playerCount}</div>}
                        {playersCards.map((card, index) => {
                            return (
                                <div key={index}>
                                    <img src={card.frontImage} className="blackjackImages" />
                                </div>
                            );
                        })}
                    </section>
                </div>
                    {!isHandComplete && (
                        <div className="BJTurnContainer">
                            <h3>Wager: {lockedBet}</h3>
                            <div className="blackjackTurnControls">
                                    <button onClick={() => handleHit(playerCardsRef, deckRef, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleEndOfGame, playerCountRef)} disabled={isDealersTurn || isHandComplete}>
                                    HIT
                                </button>
                                <button onClick={() => handleStand(setIsDealersTurn, handleDealersTurn)} disabled={isDealersTurn || isHandComplete}>
                                    STAND
                                </button>
                                <button onClick={() => handleDouble(deckRef, lockedBet, setChipCount, handleHit, setIsDealersTurn, setLockedBet, setPlayersCards, setIsPlayerBusted, setRandomizedDecks, handleDealersTurn, handleEndOfGame, playerCardsRef, playerCountRef)} disabled={isDealersTurn || isHandComplete || ((lockedBet * 2)  > chipCount) }>
                                    DOUBLE
                                </button>
                            </div>
                        </div>
                    )}
            </div>
            </div>
            <div className="blackjackUserControls">
                <div className="BJButtonsContainer">
                <BJButton setBetAmount={setBetAmount} num={5} chipCount={chipCount} />
                <BJButton setBetAmount={setBetAmount} num={25} chipCount={chipCount} />
                <BJButton setBetAmount={setBetAmount} num={100} chipCount={chipCount} />
                <BJButton setBetAmount={setBetAmount} num={500} chipCount={chipCount} />
                <BJButton setBetAmount={setBetAmount} num={1000} chipCount={chipCount} />
                <BJButton setBetAmount={setBetAmount} num={5000} chipCount={chipCount} />
                <BJButton setBetAmount={setBetAmount} num={10000} chipCount={chipCount} />
            </div>
                <form onSubmit={(e) => handleSubmit(e, setIsDealersTurn, setIsHandComplete, setLockedBet, betAmount, setChipCount, randomizedDecks, setPlayersCards, setDealersCards, setRandomizedDecks, setBetAmount, setIsBlackjack, dealersCardsRef, deckRef, handleEndOfGame, playerCountRef)}>
            <div className="betControls">
                <button disabled={!isHandComplete || previousBet < 1 || previousBet > chipCount} onClick={() => setBetAmount(() => previousBet)}>
                    SAME BET
                </button>
                <button disabled={!isHandComplete || betAmount < 1 || betAmount > chipCount}>
                    BET
                </button>
                <button type="button" disabled={!isHandComplete} onClick={() => setBetAmount(() => 0)}>
                    CLEAR
                </button>
                <button disabled={chipCount < 1 || !isHandComplete} onClick={() => setBetAmount(() => chipCount)} type="button">ALL IN</button>
            </div>
                </form>
                <div className="BJChipCountContainer">
    <h2 className="BJChipCountHeader">CHIPS</h2>
    <div className="BJChipCount">{chipCount - betAmount}</div>
                    </div>
                    
            </div>
            {winner &&
                <div className="BJPreviousBet">
                    <h2>Previous Bet:</h2>
                    <p>{winner}</p>
                    <p>wagered: {previousBet}</p>
                </div>
                }
              
                    <div className="BJbetAmountBeforeHand"> 
                        {betAmount > 0 && <h3>{betAmount}</h3>}
                    </div>
            <button className="BJtoCasinoFloorButton">Back to Casino Floor</button>
            <button className="BJtoSlotsButton">To Slots</button>
            <button className="BJtoRouletteButton">To Roulette</button>
            </div>
        </>
    )
}