import axios from "axios";

// src/api/axios.js

export const instance = axios.create({
  baseURL: backendBaseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
