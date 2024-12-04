import axios from "axios";

// 소셜 로그인
export async function requestSocialLogin(platform, code) {
  const response = await axios.post(`/api/users/${platform}-login`, {
    provider: platform,
    authCode: code,
  });
  return response.data;
}

export async function fetchUserInfo(token) {
  const response = await fetch("/api/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}
