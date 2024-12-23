import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthanticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthanticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
