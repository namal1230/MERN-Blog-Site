import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import type { AxiosRequestConfig } from "axios";
import { axiosPrivate } from "../api/axiosPrivate";
import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";
import { logout } from "../utilities/slices/authSlice";
import { removeAuth } from "../utilities/slices/loginSlice";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  const token = useSelector((state: RootState) => state.auth.user?.token) || "";

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(

      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error?.response?.status === 401 &&
          !prevRequest?._retry
        ) {
          prevRequest._retry = true;
          try {
            const newAccessToken = await refresh();

            prevRequest.headers = {
              ...prevRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };

            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            dispatch(logout());
            dispatch(removeAuth());
            window.location.href = "/";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

