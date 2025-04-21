import LoadingSpinner from "@/components/ui/loading/LoadingSpinner";
import { useAuth } from "@/provider/authProvider";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
