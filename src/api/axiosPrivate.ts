import axios from "axios";

export const axiosPrivate = axios.create({
  baseURL: "https://mern-be-sigma.vercel.app",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});