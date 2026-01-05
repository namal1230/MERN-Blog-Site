import axios from "axios";

export const apiRequest = async (apiCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (err: any) {
    if (err.response?.status === 401) {
      try {

        const { data } = await axios.get(
          "https://mern-be-sigma.vercel.app/customer/refresh-token",
          { withCredentials: true } 
        );

        localStorage.setItem("accessToken", data.accessToken);

        return await apiCall();
      } catch (refreshError) {

        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        throw refreshError;
      }
    } else {
      throw err;
    }
  }
};
