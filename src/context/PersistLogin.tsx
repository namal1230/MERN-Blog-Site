import { useEffect, useState, type PropsWithChildren } from "react"
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";
type ProtectedRouteProps = PropsWithChildren;

const PersistLogin = ({children}:ProtectedRouteProps)=>{


    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { user } = useAuth();

    useEffect(()=>{
        const verifyRefreshToken = async ()=>{
            try{
                 if (!user?.token) {
          await refresh();
        }
            }
            catch(err){
                console.error(err);
            }
            finally{
                setIsLoading(false);
            }
        }

         verifyRefreshToken();
    },[refresh, user?.token])

    if (isLoading) {
        return <div>Loading...</div>;
    }

     if (!user?.token) {
    return <Navigate to="/unauthorized" replace />;
  }

     return <>{children}</>;
    
}

export default PersistLogin;