import { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";

type Role = "user" | "admin";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: Role[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);



    console.log("AuthBootstrap -> user:", user);
    console.log("ProtectedRoute -> user:", user, "isLoading:", isLoading);



    // Wait until auth check finishes
    if (isLoading) return null;

    // Redirect if user is null
    if (!user) return <Navigate to="/unauthorized" replace />;

    // Redirect if role mismatch
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;