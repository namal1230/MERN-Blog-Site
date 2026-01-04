import { useEffect, type PropsWithChildren } from "react";
import { useAuth } from "./AuthContext";
import { replace, useNavigate } from "react-router-dom";
type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute=({children}:ProtectedRouteProps)=>{
    const user = useAuth();
    const navigate =useNavigate();


    useEffect(()=>{
        if(user === null){
            navigate('/unauthorized', {replace:true});
        }
    },[navigate,user])

    return children;
}

export default ProtectedRoute;