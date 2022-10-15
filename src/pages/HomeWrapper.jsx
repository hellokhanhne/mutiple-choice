import React from "react";
import { Navigate } from "react-router-dom";

const HomeWrapper = ({ children }) => {
  if (!localStorage.getItem("account")) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default HomeWrapper;
