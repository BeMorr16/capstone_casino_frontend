import axios from "axios";
import useUserState from "../../store/store";


export async function addTransaction(transaction) {
  try {
    const token = window.sessionStorage.getItem("token");
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
    const {data} = await axios.post(
      "https://capstone-casino-backend.onrender.com/user/register",
      formData
    );
    if (data.token) {
        window.sessionStorage.setItem("token", data.token);
        const { id, user_money } = data;
        useUserState.getState().setUser(id, user_money);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(formData) {
  try {
      const { data } = await axios.post(
          "https://capstone-casino-backend.onrender.com/user/login",
          formData
      );
    if (data.token) {
        window.sessionStorage.setItem("token", data.token);
        const { id, user_money } = data;
        useUserState.getState().setUser(id, user_money);
    }
    return data;
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
