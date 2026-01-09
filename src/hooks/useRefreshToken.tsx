import { useDispatch } from "react-redux";
import type { AppDispatch } from "../utilities/store/store";
import axios from "axios";
import { setToken } from "../utilities/slices/authSlice";
const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();

  const refresh = async () => {
    const response = await axios.get(
      "http://localhost:3000/customer/refresh-token",
      { withCredentials: true }
    );

    dispatch(setToken(response.data.accessToken));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
