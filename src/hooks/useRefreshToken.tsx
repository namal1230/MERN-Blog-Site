import { useAuth } from "../context/AuthContext";
import axios from "axios";

const useRefreshToken = ()=>{
     const { setUser } = useAuth();

    const refresh = async ()=>{
        const response = await axios.get('http://localhost:3000/customer/refresh-token',{
            withCredentials:true
        });

        setUser(prev =>
        prev
            ? {
            ...prev,
            token: response.data.accessToken,
          }
        : null);
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;