import axios from "axios";
import { refreshAccessToken } from "./auth";

export let instance;
if (import.meta.env.VITE_NODE_ENV === "development") {
  instance = axios.create({
    baseURL: "/",
  });
} else {
  instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 토큰 만료인 경우
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshAccessToken();

          // 새로 토큰으로 Authorization 헤더 갱신
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // 요청 재시도
          return instance(originalRequest);
        } catch (refreshError) {
          console.error("토큰 갱신 중 오류:", refreshError);
          // 리프레시 토큰도 만료되었다면 사용자 로그아웃 처리
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    },
  );
}
export default instance;
