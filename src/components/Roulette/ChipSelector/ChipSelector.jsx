/* eslint-disable react/prop-types */
import "./ChipSelector.css";

const ChipsSelector = ({
  selectedChip,
  onChipSelect,
  onRepeatLastBets,
  onUndoLastBet,
  onClearBets, 
}) => {
  const chipValues = [1, 5, 10, 25, 50, 100];

  return (
    <div className="chips-selector">
      {chipValues.map((value) => (
        <button
          key={value}
          className={`chip-button ${selectedChip === value ? "selected" : ""}`}
          onClick={() => onChipSelect(value)}
        >
          {value}
        </button>
      ))}
      <button onClick={onRepeatLastBets}>Repeat Last Bet</button>
      <button onClick={onUndoLastBet}>Undo Last Bet</button>
      <button onClick={onClearBets}>Clear Bets</button>{" "}
    </div>
  );
};

export default ChipsSelector;
