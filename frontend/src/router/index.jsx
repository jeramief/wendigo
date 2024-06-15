import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Landing from "../components/Landing/Landing";
import { AllCarsForSell, CarDetails } from "../components/Cars";
import AllHistory from "../components/Garage/AllHistory";
import { Sell } from "../components/Sell";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/cars",
        element: <AllCarsForSell />,
      },
      {
        path: "/cars/:carId",
        element: <CarDetails />,
      },
      {
        path: "/sell-my-car",
        element: <Sell />,
      },
      {
        path: "/garage",
        element: <AllHistory />,
      },
      {
        path: "/garage/sells",
        element: <h1>Sells List coming soon!</h1>,
      },
      {
        path: "/garage/sells/:sellId",
        element: <h1>My Sell!</h1>,
      },
      {
        path: "/garage/purchases/:purchaseId",
        element: <h1>My Purchases!</h1>,
      },
      {
        path: "/wishlist",
        element: <h1>Wishlist coming soon!</h1>,
      },
    ],
  },
]);
