import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://mern-be-production.up.railway.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});