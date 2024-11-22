import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginPostCode() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const authorizationCode = searchParams.get("code");
    const platform = searchParams.get("platform"); // 플랫폼 정보 가져오기

    if (authorizationCode && platform) {
      console.log("Authorization Code:", authorizationCode);

      // 중복 요청 방지
      const usedAuthCode = localStorage.getItem("usedAuthCode");
      if (usedAuthCode === authorizationCode) {
        console.error("이미 사용된 인증 코드입니다.");
        return;
      }

      postCode(platform, authorizationCode);
      localStorage.setItem("usedAuthCode", authorizationCode);

      // URL 초기화
      setTimeout(() => navigate("/auth", { replace: true }), 100);
    }
  }, [searchParams, navigate]);

  function postCode(platform, authCode) {
    let data;
    let url;

    switch (platform) {
      case "kakao":
        data = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
          redirect_uri: "http://localhost:5173/auth",
          code: authCode,
        });
        url = "https://kauth.kakao.com/oauth/token";
        break;

      case "naver":
        data = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_NAVER_CLIENT_ID,
          client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
          redirect_uri: "http://localhost:5173/auth",
          code: authCode,
          state: "someRandomState",
        });
        url = "https://nid.naver.com/oauth2.0/token";
        break;

      case "google":
        data = new URLSearchParams({
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
          redirect_uri: "http://localhost:5173/auth",
          code: authCode,
        });
        url = "https://oauth2.googleapis.com/token";
        break;

      default:
        console.error("지원하지 않는 플랫폼입니다.");
        return;
    }

    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("응답:", response.data);
        localStorage.setItem("authToken", response.data.access_token);
      })
      .catch((error) => {
        console.error("에러:", error.response?.data || error.message);
      });
  }

  return <div>LoginPostCode</div>;
}
