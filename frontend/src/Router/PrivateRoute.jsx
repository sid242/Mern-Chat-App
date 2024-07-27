import React from "react";
import { getLocalStorage } from "../utils";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = getLocalStorage("accessToken");
  if (children) {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
