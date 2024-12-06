import axios from "axios";

// // 배포 용
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// export const devinstance = axios.create({
//   baseURL: "/",
// });

export default instance;
