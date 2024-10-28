import AuthRoute from "@/components/auth-route";
import ProtectedRoute from "@/components/protected-route";
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
import Settings from "@/pages/dashbaord/Settings";
import Shipment from "@/pages/dashbaord/Shipment";
import TrackShipment from "@/pages/dashbaord/TrackShipment";
import Wallet from "@/pages/dashbaord/Wallet";
import Layout from "@/pages/layout";
import { createBrowserRouter } from "react-router-dom";
import GetQuote from "@/pages/dashbaord/GetQoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <DashboardLayout />
        </Layout>
        {/* <ModalProvider /> */}
      </ProtectedRoute>
    ),
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
        path: "transactions/",
        element: <Wallet />,
      },
      {
        path: "address-book/",
        element: <AddressBook />,
      },
      {
        path: "get-quote/",
        element: <GetQuote />,
      },
      {
        path: "track/",
        element: <TrackShipment />,
      },
      {
        path: "settings/",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/shipment/new",
    element: (
      <ProtectedRoute>
        <Layout>
          <BookShipment />
        </Layout>
        {/* <ModalProvider /> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "auth/",

    element: (
      <AuthRoute>
        <AuthLayout />
      </AuthRoute>
    ),
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
    element: (
      <AuthRoute>
        <ResetPassword />
      </AuthRoute>
    ),
  },
  {
    path: "auth/reset-password-confirm/",
    element: (
      <AuthRoute>
        <NewPassword />
      </AuthRoute>
    ),
  },
  {
    path: "auth/verify-email/",
    element: (
      <AuthRoute>
        <VerifyEmail />
      </AuthRoute>
    ),
  },
  {
    path: "auth/verify-email/verification/",
    element: (
      <AuthRoute>
        <Verification />
      </AuthRoute>
    ),
  },
]);
