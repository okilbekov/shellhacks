import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // if(!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} />
  // }

  return <Outlet />;
}

export default PrivateRoute;