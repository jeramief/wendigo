import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Landing from "../components/Landing/Landing";
import { AllCarsForSell } from "../components/Cars";

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
        element: <h1>Car!</h1>,
      },
      {
        path: "/sell-my-car",
        element: <h1>Sell!</h1>,
      },
      {
        path: "/history",
        element: <h1>History!</h1>,
      },
      {
        path: "/history/sells",
        element: <h1>Sells!</h1>,
      },
      {
        path: "/history/sells/:sellId",
        element: <h1>My Sell!</h1>,
      },
      {
        path: "/history/purchases",
        element: <h1>Purchases!</h1>,
      },
      {
        path: "/history/purchases/:purchaseId",
        element: <h1>My Purchases!</h1>,
      },
      {
        path: "/wishlist",
        element: <h1>Wishlist!</h1>,
      },
    ],
  },
]);
