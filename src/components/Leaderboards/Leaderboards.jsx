import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  betLeaderboardRequest,
  moneyLeaderboardRequest,
  recordLeaderboardRequest,
} from "../Utils/APIRequests";
import "./leaderboards.css";

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState("bet");

  const {
    data: betLeaderboard,
    isLoading: isLoadingBetLeaderboard,
    error: errorBetLeaderboard,
  } = useQuery({
    queryKey: ["bet"],
    queryFn: betLeaderboardRequest
  });

  const {
    data: recordLeaderboard,
    // isLoading: isLoadingRecordLeaderboard,
    error: errorRecordLeaderboard,
  } = useQuery({
    queryKey: ["record"],
    queryFn: recordLeaderboardRequest
  });

  const {
    data: moneyLeaderboard,
    // isLoading: isLoadingMoneyLeaderboard,
    error: errorMoneyLeaderboard,
  } = useQuery({
    queryKey: ["money"],
    queryFn: moneyLeaderboardRequest,
  });

  if (
    isLoadingBetLeaderboard
  ) {
    return <div>Loading leaderboards...</div>;
  }

  if (errorBetLeaderboard || errorRecordLeaderboard || errorMoneyLeaderboard) {
    return <div>Error getting leaderboards</div>;
  }

  const renderBetLeaderboard = (data) => (
    <div className="leaderboard-grid">
      <div className="header" style={{ gridColumn: "1" }}>
        Game
      </div>
      <div className="header" style={{ gridColumn: "2" }}>
        Amount Won
      </div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cell" style={{ gridColumn: "1" }}>
            {item.game}
          </div>
          <div className="cell" style={{ gridColumn: "2" }}>
            {item.money}
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const renderRecordLeaderboard = (data) => (
    <div className="leaderboard-grid">
      <div className="header" style={{ gridColumn: "1" }}>
        Username
      </div>
      <div className="header" style={{ gridColumn: "2" }}>
        Wins
      </div>
      <div className="header" style={{ gridColumn: "3" }}>
        Losses
      </div>
      <div className="header" style={{ gridColumn: "4" }}>
        Win Rate
      </div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cell" style={{ gridColumn: "1" }}>
            {item.username}
          </div>
          <div className="cell" style={{ gridColumn: "2" }}>
            {item.wins}
          </div>
          <div className="cell" style={{ gridColumn: "3" }}>
            {item.losses}
          </div>
          <div className="cell" style={{ gridColumn: "4" }}>
            {item.win_percentage}%
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const renderMoneyLeaderboard = (data) => (
    <div className="leaderboard-grid">
      <div className="header" style={{ gridColumn: "1" }}>
        Username
      </div>
      <div className="header" style={{ gridColumn: "2" }}>
        Money
      </div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cell" style={{ gridColumn: "1" }}>
            {item.username}
          </div>
          <div className="cell" style={{ gridColumn: "2" }}>
            ${item.user_money}
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const getActiveLeaderboard = () => {
    switch (activeTab) {
      case "bet":
        return renderBetLeaderboard(betLeaderboard);
      case "record":
        return renderRecordLeaderboard(recordLeaderboard);
      case "money":
        return renderMoneyLeaderboard(moneyLeaderboard);
      default:
        return null;
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "bet" ? "active" : ""}`}
          onClick={() => setActiveTab("bet")}
        >
          Biggest Bets
        </button>
        <button
          className={`tab-button ${activeTab === "record" ? "active" : ""}`}
          onClick={() => setActiveTab("record")}
        >
          Best Records
        </button>
        <button
          className={`tab-button ${activeTab === "money" ? "active" : ""}`}
          onClick={() => setActiveTab("money")}
        >
          Most Money
        </button>
      </div>
      <div className="leaderboard">{getActiveLeaderboard()}</div>
    </div>
  );
}
