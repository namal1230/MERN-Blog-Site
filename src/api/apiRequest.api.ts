import axios from "axios";

// Helper to automatically refresh token if access token expires
export const apiRequest = async (apiCall: () => Promise<any>) => {
  try {
    return await apiCall();
  } catch (err: any) {
    // If access token expired (401)
    if (err.response?.status === 401) {
      try {
        // Call refresh token endpoint (backend sets HttpOnly cookie)
        const { data } = await axios.get(
          "http://localhost:3000/customer/refresh-token",
          { withCredentials: true } // sends refresh token cookie
        );

        // Save new access token in localStorage
        localStorage.setItem("accessToken", data.accessToken);

        // Retry original request
        return await apiCall();
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // redirect to login
        throw refreshError;
      }
    } else {
      throw err;
    }
  }
};
