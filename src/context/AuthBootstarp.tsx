import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../utilities/slices/authSlice";
import type { AppDispatch, RootState } from "../utilities/store/store";

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
  }, [dispatch, user]);

  if (isLoading) return <div>Checking authentication...</div>;

  return <>{children}</>;
};

export default AuthBootstrap;
