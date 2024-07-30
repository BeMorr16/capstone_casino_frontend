
import React, { useState } from "react";
import Board from "./Board/Board";
import ChipsSelector from "./ChipSelector/ChipSelector";
import NumberHistory from "./NumberHistory/NumberHistory";
import "./Roulette.css";
import calculateWinningsHelper from "./helpers/calculateWinningsHelper";
import {
  getRotationFromNumber,
  getRandomEndRotation,
  getZeroEndRotation,
  getBallEndRotation,
  getBallNumberOfRotations,
  spinWheelAnimation,
} from "./helpers/wheelHelper";
import { getRandomInt } from "./helpers/utils";
import {addTransaction}  from "../Utils/APIRequests";
import useUserState from "../../store/store";

const Roulette = () => {
  const bears = useUserState((state) => state.money);
  console.log(bears, "-------------------------------------------------------------------------------------------")
  const [number, setNumber] = useState(null);
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [placedBets, setPlacedBets] = useState([]);
  const [betHistory, setBetHistory] = useState([]);
  const [lastBets, setLastBets] = useState([]);
  const [lastBet, setLastBet] = useState(null);
  const [result, setResult] = useState(null);
  const [selectedChip, setSelectedChip] = useState(1);
  const [numberHistory, setNumberHistory] = useState([]);
  const [lastNumber, setLastNumber] = useState(0);
  const [rouletteData, setRouletteData] = useState({
    numbers: [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
      24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
    ],
  });

  // Constants 
  const totalNumbers = 37;
  const singleSpinDuration = 5000;
  const singleRotationDegree = 360 / totalNumbers;
  


  const spinWheel = (number) => {
    const bezier = [0.165, 0.84, 0.44, 1.005];
    const ballMinNumberOfSpins = 2;
    const ballMaxNumberOfSpins = 4;
    const wheelMinNumberOfSpins = 2;
    const wheelMaxNumberOfSpins = 4;

    const currentNumber = number;
    const lastNumberRotation = getRotationFromNumber(
      lastNumber.toString(),
      rouletteData,
      singleRotationDegree
    );

    const endRotation = -getRandomEndRotation(
      ballMinNumberOfSpins,
      ballMaxNumberOfSpins,
      totalNumbers,
      singleRotationDegree
    );
    const zeroFromEndRotation = getZeroEndRotation(endRotation);
    const ballEndRotation =
      getBallNumberOfRotations(wheelMinNumberOfSpins, wheelMaxNumberOfSpins) +
      getBallEndRotation(
        zeroFromEndRotation,
        currentNumber,
        rouletteData,
        singleRotationDegree
      );

    spinWheelAnimation(
      lastNumberRotation,
      endRotation,
      ballEndRotation,
      singleSpinDuration,
      bezier
    );
    setLastNumber(currentNumber);
  };

  const calculateWinnings = (number, placedBets) => {
    const { totalWinnings, betResults } = calculateWinningsHelper(
      number,
      placedBets
    );

    const newBalance = playerBalance + totalWinnings;
    setPlayerBalance(newBalance);
    setResult(totalWinnings);

    console.log("Bets that hit and their payouts:");
    betResults.forEach((result) => {
      console.log(`Bet: ${result.bet}, Payout: ${result.payout}`);
    });

    setLastBets(placedBets);
    setPlacedBets([]);
  };


  //  Handlers 
  const handleSpinClick = () => {
    const randomNumber = getRandomInt(0, 36);
    spinWheel(randomNumber);

    setTimeout(() => {
      calculateWinnings(randomNumber, placedBets);
      setNumberHistory((prevHistory) => [
        randomNumber,
        ...prevHistory.slice(0, 11),
      ]);
    }, singleSpinDuration);
  };

  const handlePlaceBet = (newBet) => {
    if (playerBalance < newBet.amount) {
      alert("You cannot bet more than your current balance.");
      return;
    }

    setPlacedBets((prevBets) => {
      const existingBet = prevBets.find(
        (bet) => JSON.stringify(bet.meaning) === JSON.stringify(newBet.meaning)
      );

      if (existingBet) {
        const updatedBets = prevBets.map((bet) =>
          JSON.stringify(bet.meaning) === JSON.stringify(newBet.meaning)
            ? { ...bet, amount: bet.amount + newBet.amount }
            : bet
        );
        return updatedBets;
      } else {
        return [...prevBets, newBet];
      }
    });

    setBetHistory((prevHistory) => [...prevHistory, newBet]);
    setPlayerBalance((prevBalance) => prevBalance - newBet.amount);
  };

  const handleUndoLastBet = () => {
    if (betHistory.length === 0) return;

    const lastBet = betHistory[betHistory.length - 1];

    setPlacedBets((prevBets) => {
      const betIndex = prevBets.findIndex(
        (bet) => JSON.stringify(bet.meaning) === JSON.stringify(lastBet.meaning)
      );

      if (betIndex !== -1) {
        const updatedBets = [...prevBets];
        if (updatedBets[betIndex].amount > lastBet.amount) {
          updatedBets[betIndex].amount -= lastBet.amount;
        } else {
          updatedBets.splice(betIndex, 1);
        }
        return updatedBets;
      }
      return prevBets;
    });

    setPlayerBalance((prevBalance) => prevBalance + lastBet.amount);
    setBetHistory((prevHistory) => prevHistory.slice(0, -1));
  };

  const handleClearBets = () => {
    const totalBets = placedBets.reduce((acc, bet) => acc + bet.amount, 0);
    setPlayerBalance((prevBalance) => prevBalance + totalBets);
    setPlacedBets([]);
  };

  const handleRepeatLastBets = () => {
    const totalLastBets = lastBets.reduce((acc, bet) => acc + bet.amount, 0);
    if (playerBalance < totalLastBets) {
      alert("You cannot bet more than your current balance.");
      return;
    }

    setPlayerBalance((prevBalance) => prevBalance - totalLastBets);
    setPlacedBets(lastBets.map((bet) => ({ ...bet })));
  };

  const handleChipSelect = (chip) => {
    setSelectedChip(chip);
  };

  return (
    <div className="roulette-game">
      <h1>Roulette Game</h1>

      <div className="wheel-and-history">
        <div className={"roulette-wheel"} onClick={handleSpinClick}>
          <div className={"layer-2 wheel"}></div>
          <div className={"layer-3"}></div>
          <div className={"layer-4 wheel"}></div>
          <div className={"layer-5"}></div>
          <div className={"ball-container"}>
            <div className={"ball"}></div>
          </div>
        </div>
        <NumberHistory history={numberHistory} />
      </div>
      {number !== null && <h2>Winning Number: {number}</h2>}
      {result !== null && <h2>Total Payout: ${result}</h2>}
      {playerBalance !== null && <h2>Balance: ${playerBalance}</h2>}
      <button onClick={handleSpinClick}>Spin the Wheel</button>
      <ChipsSelector
        selectedChip={selectedChip}
        onChipSelect={handleChipSelect}
        onRepeatLastBets={handleRepeatLastBets}
        onUndoLastBet={handleUndoLastBet}
        onClearBets={handleClearBets}
      />
      <Board
        selectedChip={selectedChip}
        placeBet={handlePlaceBet}
        placedBets={placedBets}
      />
    </div>
  );
};

export default Roulette;
