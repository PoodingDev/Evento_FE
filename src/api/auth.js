import axios from "axios";

// 소셜 로그인
export async function requestSocialLogin(platform, code) {
  const response = await axios.post(`/api/auth/${platform}-login`, {
    provider: platform,
    access_token: code,
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
