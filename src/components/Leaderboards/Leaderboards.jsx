// import React from 'react'

import { useQueries } from "@tanstack/react-query";
import axios from "axios";

async function betLeaderboardRequest() {
  const { data } = await axios.get(
    "https://capstone-casino-backend.onrender.com/leaderboard/transaction"
  );
  return data;
}
async function recordLeaderboardRequest() {
  const { data } = await axios.get(
    "https://capstone-casino-backend.onrender.com/leaderboard/user/record"
  );
  return data;
}
async function moneyLeaderboardRequest() {
  const { data } = await axios.get(
    "https://capstone-casino-backend.onrender.com/leaderboard/user"
  );
  return data;
}

export default function Leaderboards() {
  const queries = [
    {
      queryKey: ["bet"],
      queryFn: betLeaderboardRequest,
    },
    {
      queryKey: ["record"],
      queryFn: recordLeaderboardRequest,
    },
    {
      queryKey: ["money"],
      queryFn: moneyLeaderboardRequest,
    },
  ];

  const results = useQueries({ queries });

  const [
    { data: betLeaderboard, isLoading: isLoadingBetLeaderboard, error: errorBetLeaderboard },
    { data: recordLeaderboard, isLoading: isLoadingRecordLeaderboard, error: errorRecordLeaderboard },
    { data: moneyLeaderboard, isLoading: isLoadingMoneyLeaderboard, error: errorMoneyLeaderboard },
  ] = results;

  if (isLoadingBetLeaderboard || isLoadingRecordLeaderboard || isLoadingMoneyLeaderboard) {
    return <div>Loading leaderboards...</div>;
  }

  if (errorBetLeaderboard || errorRecordLeaderboard || errorMoneyLeaderboard) {
    return <div>Error getting transactions</div>;
  }

  console.log("bet", betLeaderboard);
  console.log("record", recordLeaderboard);
  console.log("money", moneyLeaderboard);
  return <div>Leaderboards</div>;
}
