// import React from 'react'

import { useQueries } from "@tanstack/react-query";
import { betLeaderboardRequest, moneyLeaderboardRequest, recordLeaderboardRequest } from "../Utils/APIRequests";

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
