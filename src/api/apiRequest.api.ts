import axios from "axios";

export const apiRequest = async (apiCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (err: any) {
    if (err.response?.status === 401) {
      try {

         await axios.get(
          "https://mern-be-production.up.railway.app/customer/refresh-token",
          { withCredentials: true } 
        );

        return await apiCall();
      } catch (refreshError) {
        window.location.href = "/login";
        throw refreshError;
      }
    } else {
      throw err;
    }
  }
};
