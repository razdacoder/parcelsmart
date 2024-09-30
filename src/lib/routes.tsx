import AuthLayout from "@/pages/auth/AuthLayout";
import NewPassword from "@/pages/auth/NewPassowrd";
import ResetPassword from "@/pages/auth/ResetPassword";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Verification from "@/pages/auth/Verification";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import AddressBook from "@/pages/dashbaord/AddressBook";
import BookShipment from "@/pages/dashbaord/BookShipment";
import DashboardLayout from "@/pages/dashbaord/DashboardLayout";
import Home from "@/pages/dashbaord/Home";
import Shipment from "@/pages/dashbaord/Shipment";
import Wallet from "@/pages/dashbaord/Wallet";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shipment/",
        element: <Shipment />,
      },
      {
        path: "wallet/",
        element: <Wallet />,
      },
      {
        path: "address-book/",
        element: <AddressBook />,
      },
    ],
  },
  {
    path: "/shipment/new",
    element: <BookShipment />,
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "register/",
        element: <SignUp />,
      },
      {
        path: "login/",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "auth/reset-password/",
    element: <ResetPassword />,
  },
  {
    path: "auth/reset-password-confirm/",
    element: <NewPassword />,
  },
  {
    path: "auth/verify-email/",
    element: <VerifyEmail />,
  },
  {
    path: "auth/verify-email/:gfghfhgfgfgh/",
    element: <Verification />,
  },
]);
