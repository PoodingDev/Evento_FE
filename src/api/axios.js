import axios from "axios";

// // 배포 용
// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

const instance = axios.create({
  baseURL: "/", 
});

export default instance;
