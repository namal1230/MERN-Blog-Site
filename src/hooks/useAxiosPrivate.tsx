import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthContext";
import type { AxiosRequestConfig } from "axios";
import { axiosPrivate } from "../api/axiosPrivate";
import { useSelector } from "react-redux";
import type { RootState } from "../utilities/store/store";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { user } = useAuth();

  const token = useSelector((state: RootState) => state.persistedReducer.token) || "";

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

          const newAccessToken = await refresh();

          prevRequest.headers = {
            ...prevRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
