import axios from "axios";
import { instance } from "./axios";

// 소셜 로그인
export async function requestKakaoLogin(code) {
  const response = await instance.post(`/api/users/kakao-login/`, {
    code: code.axios.baseURL,
  });
  return response.data;
}

export async function requestGoogleLogin(code) {
  console.log("auth.js requestGoogleLogin");
  const response = await axios.post(
    `https://evento.r-e.kr/api/users/google-login/`,
    {
      code: code,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    },
  );

  return response.data;
}

export async function requestNaverLogin(code, state) {
  const response = await instance.post(`/api/users/naver-login/`, {
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
