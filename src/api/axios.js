import axios from "axios";

// src/api/axios.js

const instance = axios.create({
  baseURL: "/", // 상대 경로 사용
});

export default instance;
