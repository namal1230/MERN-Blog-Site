import { type PropsWithChildren } from "react";
import { Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";

type Role = "user" | "admin";

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: Role[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

    if (isLoading) return null;
    if (!user) return <Navigate to="/unauthorized" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;