import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://blog-phost3-3gpdcbeht-namal-dilmiths-projects.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});