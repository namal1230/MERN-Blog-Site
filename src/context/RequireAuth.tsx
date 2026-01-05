import { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import { replace, useNavigate } from "react-router-dom";

type Role = "user" | "admin";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: Role[];
};

const ProtectedRoute=({children, allowedRoles}:ProtectedRouteProps)=>{
    const user = useAuth();
    const navigate =useNavigate();


    useEffect(()=>{
        if(user === null){
            navigate('/unauthorized', {replace:true});
            throw new Error("Unauthorized...")
        }

        const role = user.user?.role;

        if (!role) {
            navigate("/unauthorized", { replace: true });
            return;
        }

        if (allowedRoles && !allowedRoles.includes(role)) {
            navigate("/unauthorized", { replace: true });
        }
    },[navigate,user])

    return children;
}

export default ProtectedRoute;