import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://blog-phost3.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});