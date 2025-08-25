// lib/axios.ts
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/api/",
  timeout: 25_000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    return Promise.reject(error);
  }
);
