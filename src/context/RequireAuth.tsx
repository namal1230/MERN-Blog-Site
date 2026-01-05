import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";
import { Navigate } from "react-router-dom";
import type { PropsWithChildren } from "react";

type Role = "user" | "admin";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: Role[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  const role = user.role;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;