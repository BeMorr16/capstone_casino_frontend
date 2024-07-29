import axios from "axios";

export async function addTransaction(transaction) {
  try {
    const token = window.localStorage.getItem("token");
    const { data } = await axios.post(
      "https://capstone-casino-backend.onrender.com/transaction/add",
      transaction,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function registerUser(formData) {
  try {
    const response = await axios.post(
      "https://capstone-casino-backend.onrender.com/user/register",
      formData
    );
    if (response.data.token) {
      window.localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(formData) {
  try {
    const response = await axios.post(
      "https://capstone-casino-backend.onrender.com/user/login",
      formData
    );
    if (response.data.token) {
      window.localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function betLeaderboardRequest() {
  const { data } = await axios.get(
    "https://capstone-casino-backend.onrender.com/leaderboard/transaction"
  );
  return data;
}

export async function recordLeaderboardRequest() {
  const { data } = await axios.get(
    "https://capstone-casino-backend.onrender.com/leaderboard/user/record"
  );
  return data;
}

export async function moneyLeaderboardRequest() {
  const { data } = await axios.get(
    "https://capstone-casino-backend.onrender.com/leaderboard/user"
  );
  return data;
}
