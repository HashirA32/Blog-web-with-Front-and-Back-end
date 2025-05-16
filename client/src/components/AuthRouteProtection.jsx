import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RouteIndex, RouteSignIn } from "./Helper/RouteNames";
const AuthRouteProtection = () => {
  const user = useSelector((state) => state.user);

  if (user && user.isLoggedIn) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={RouteSignIn} />;
  }
};

export default AuthRouteProtection;
