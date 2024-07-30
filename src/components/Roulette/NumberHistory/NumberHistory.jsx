/* eslint-disable react/prop-types */
// NumberHistory.jsx
import "./NumberHistory.css"; // Ensure this CSS file is imported
import { isRed } from "../helpers/utils";
const NumberHistory = ({ history }) => {
  const redNumbers = [];
  const blackNumbers = [];

  // Distribute numbers into their respective columns
  history.forEach((num, index) => {
    if (isRed(num)) {
      redNumbers.push(num);
      if (blackNumbers.length < redNumbers.length) {
        blackNumbers.push(null); // Add a placeholder to keep the columns aligned
      }
    } else {
      blackNumbers.push(num);
      if (redNumbers.length < blackNumbers.length) {
        redNumbers.push(null); // Add a placeholder to keep the columns aligned
      }
    }
  });

  return (
    <div className="number-history">
      <h3>Number History</h3>
      <div className="history-list">
        <div className="history-column red-column">
          {redNumbers.map((num, index) => (
            <div
              key={index}
              className={`history-item ${num === null ? "blank" : "red"}`}
            >
              {num !== null ? num : ""}
            </div>
          ))}
        </div>
        <div className="history-column black-column">
          {blackNumbers.map((num, index) => (
            <div
              key={index}
              className={`history-item ${num === null ? "blank" : "black"}`}
            >
              {num !== null ? num : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberHistory;
