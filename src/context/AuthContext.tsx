import { createContext, type PropsWithChildren,useContext,useState } from "react";
import type { User } from "../types/User";
import useRefreshToken from "../hooks/useRefreshToken";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);




type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
}



export const AuthProvider = ({ children, isSignedIn }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(
    isSignedIn
      ? { id: 1, role: "user", token: "demo-token" }
      : null
  );
  

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context; 
};
