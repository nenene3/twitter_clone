import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router"; // Fixed import from react-router-dom

const ProtectedRoute = () => {
  const { user, isPending, isError } = useAuth();
  
  if (isPending) {
    return <div className="flex justify-center items-center h-screen bg-red-500">Loading...</div>;
  }
  
  if (isError || !user) {
    // console.log('login' + user)
    // console.log(isError)
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;