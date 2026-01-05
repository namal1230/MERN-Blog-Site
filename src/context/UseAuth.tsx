import { useContext } from "react";
import {AuthContext} from "./AuthContext";

const UseAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuth must be used inside AuthProvider");
  }

  return context;
};

export default UseAuth;
