import axios from "axios";

// 소셜 로그인
export async function requestSocialLogin(platform, code) {
  const response = await axios.post("/api/auth/social-login", {
    provider: platform,
    access_token: code,
  });
  return response.data;
}

// 사용자 정보 조회
export async function fetchUserInfo(token) {
  const response = await axios.get(`/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
