// src/api/axios.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Don't change this
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Optional: Only if you are using cookies
});

// 🔐 Automatically attach token to headers if exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
