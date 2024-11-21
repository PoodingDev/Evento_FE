import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginPostCode() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const authorizationCode = searchParams.get("code");
    if (authorizationCode) {
      console.log("Authorization Code:", authorizationCode);

      // 중복 요청 방지
      const usedAuthCode = localStorage.getItem("usedAuthCode");
      if (usedAuthCode === authorizationCode) {
        console.error("이미 사용된 인증 코드입니다.");
        return;
      }

      postCode(authorizationCode);
      localStorage.setItem("usedAuthCode", authorizationCode);

      // URL 초기화
      setTimeout(() => navigate("/auth", { replace: true }), 100);
    }
  }, [searchParams, navigate]);

  function postCode(authCode) {
    const data = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_KAKAO_CLIENT_ID,
      redirect_uri: "http://localhost:5173/auth",
      code: authCode,
    });

    axios
      .post("https://kauth.kakao.com/oauth/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        console.log("응답:", response.data); // Access Token 출력
        localStorage.setItem("authToken", response.data.access_token); // Access Token 저장
      })
      .catch((error) => {
        console.error("에러:", error.response.data); // 상세 에러 출력
      });
  }

  return <div>LoginPostCode</div>;
}
