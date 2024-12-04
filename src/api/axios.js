import axios from "axios";

// src/api/axios.js

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export default instance;
