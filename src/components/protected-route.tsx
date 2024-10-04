// src/components/ProtectedRoute.tsx
import { useAuth } from "@/components/auth-provider"; // Adjust path as necessary
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Navigate to="/auth/login/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
