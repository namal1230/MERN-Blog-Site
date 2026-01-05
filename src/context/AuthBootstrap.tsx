import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../utilities/slices/authSlice";
import type { AppDispatch, RootState } from "../utilities/store/store";
import { Navigate } from "react-router-dom";

type AuthBootstrapProps = {
  children: React.ReactNode;
};

const AuthBootstrap = ({ children }: AuthBootstrapProps) => {
   const dispatch = useDispatch<AppDispatch>();
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
  

  useEffect(() => {
      if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Show loader while fetching user
//   if (isLoading) return <div>Checking authentication...</div>;

  // Optionally redirect if not authenticated
  // if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthBootstrap;
