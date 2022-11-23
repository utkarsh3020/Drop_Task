import React from "react";
import { Navigate } from "react-router-dom";

function isAuthenticated(userNameKey) {
  return JSON.parse(localStorage.getItem(userNameKey)).isUserLoggedIn;
}

export default ProtectedRoute = ({ children }) => {
  console.log(isAuthenticated("username"));
  if(!isAuthenticated("username"))
   {
       return <Navigate to="/" />;
    }
  console.log(children);
  return children;
}

