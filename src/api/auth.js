import axios from "axios";

// 소셜 로그인
export async function requestKakaoLogin(code) {
  const response = await instance.post(`/api/users/kakao-login`, {
    code: code,
  });
  return response.data;
}

export async function requestGoogleLogin(code) {
  const response = await instance.post(`/api/users/google-login`, {
    code: code,
  });
  return response.data;
}

export async function requestNaverLogin(code, state) {
  const response = await instance.post(`/api/users/naver-login`, {
    code: code,
    state: state,
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
