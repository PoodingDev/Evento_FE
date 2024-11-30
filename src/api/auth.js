import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "/", // 상대 경로 사용
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestSocialLogin = async (platform, code) => {
  const endpoint = `/api/auth/social-login`;
  console.log(
    `Requesting to: ${endpoint} with platform: ${platform}, code: ${code}`,
  );

  const response = await apiClient.post(endpoint, { platform, code });
  return response.data;
};
