import { useAuth } from "@/components/auth-provider"; // Adjust path as necessary
import React from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { authToken } = useAuth();

  if (authToken) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
