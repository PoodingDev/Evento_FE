import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function LoginPostCode() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const authCode = searchParams.get("code");
    const state = searchParams.get("state");

    console.log("state2:", state);

    if (authCode) {
      try {
        const platform = state
          ? JSON.parse(decodeURIComponent(state)).platform
          : null;

        console.log("Auth Code:", authCode);
        console.log("Parsed Platform:", platform);

        if (!platform || !["kakao", "naver", "google"].includes(platform)) {
          throw new Error("지원하지 않는 플랫폼");
        }
        sendAuthCodeToBackend(platform, authCode, state || "state");
      } catch (error) {
        console.error("Error", error.message);
      }
    }
  }, [searchParams]);

  async function sendAuthCodeToBackend(platform, authCode, state) {
    const platformEndpoints = {
      kakao: import.meta.env.VITE_BACKEND_KAKAO_URL,
      naver: import.meta.env.VITE_BACKEND_NAVER_URL,
      google: import.meta.env.VITE_BACKEND_GOOGLE_URL,
    };

    const url = platformEndpoints[platform];
    if (!url) {
      console.error("지원하지 않는 URI");
      return;
    }

    // 요청 데이터 설정
    const payload = {
      code: authCode,
      ...(platform === "naver" ? { state } : {}), //네이버
    };

    try {
      const response = await axios.post(url, payload);
      console.log(`[${platform}] 로그인`, response.data);
      // 로그인 성공 이후 처리
    } catch (error) {
      console.error(`백엔드 응답없음`, error.response?.data || error.message);
    }
  }

  return <div>인증 중...</div>;
}
