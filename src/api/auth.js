import axios from "axios";
import { instance } from "./axios";

// 소셜 로그인
export async function requestKakaoLogin(code) {
  const response = await instance.post(
    `api/users/kakao-login/`,
    {
      code: code,
      state: "state",
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

export async function requestGoogleLogin(code) {
  const response = await instance.post(
    `api/users/google-login/`,
    {
      code: code,
      state: "state",
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
  const response = await instance.post(
    `api/users/naver-login/`,
    {
      code: code,
      state: state,
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

export async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("리프레시 토큰이 없습니다.");
    }

    const response = await instance.post(`/api/users/login/refresh/`, {
      refresh: refreshToken,
    });

    const { access } = response.data;

    localStorage.setItem("token", access);

    return access;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    throw error;
  }
}

export async function fetchUserInfo(token) {
  const response = await instance.get("api/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
