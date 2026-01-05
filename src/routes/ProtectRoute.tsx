import React, { useContext, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: JSX.Element; // single React element
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { accessToken } = useContext(AuthContext);

  if (!accessToken) {
    return <Navigate to="/login" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
