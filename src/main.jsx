import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Layout from "./components/Layout/Layout.jsx";
<<<<<<< HEAD
import SlotMachine from "./components/Slots/SlotMachine/SlotMachine.jsx";
import LoginRegister from "./components/LoginRegisterPage/LoginRegister.jsx";
import Leaderboards from "./components/Leaderboards/Leaderboards.jsx";
import Roulette from "./components/Roulette/Roulette.jsx";
import Casino from "./components/Casino/Casino.jsx";
import HowToPlay from "./components/HowToPlays/HowToPlay.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Warehouse from "./components/Warehouse/Warehouse.jsx";
=======
import SlotMachine from "./components/Slots/SlotMachine/SlotMachine.jsx";
import LoginRegister from "./components/LoginRegisterPage/LoginRegister.jsx";
import Leaderboards from "./components/Leaderboards/Leaderboards.jsx";
import Roulette from "./components/Roulette/Roulette.jsx";
import Casino from "./components/Casino/Casino.jsx";
import HowToPlay from "./components/HowToPlays/HowToPlay.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Warehouse from "./components/Warehouse/Warehouse.jsx";
>>>>>>> b8194ddfdeed311c78e1ad41b516474372adb823


const Blackjack = lazy(() => import('./components/Blackjack/BJComponents/Blackjack.jsx'));

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/howtoplay/:game',
        element: <HowToPlay/>
      },
      {
        path: '/account',
        element: <LoginRegister/>
      },
      {
        path: '/leaderboards',
        element: <Leaderboards/>
      },
      {
        path: '/casino',
        element: <Casino/>
      },
      {
        path: '/slots',
        element: <SlotMachine/>
      },
      {
        path: '/roulette',
        element: <Roulette/>
      },
      {
        path: '/blackjack',
        element: <Blackjack/>
      },
      {
        path: '/warehouse',
        element: (
          <ProtectedRoute>
            <Warehouse/>
          </ProtectedRoute>
        )
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Waiting for spot at the table...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
