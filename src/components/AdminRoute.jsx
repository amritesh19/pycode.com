import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (user.email !== process.env.REACT_APP_ADMIN_EMAIL) {
    //console.log(user);
    //console.log("Check user is not Admin: ", user);
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
