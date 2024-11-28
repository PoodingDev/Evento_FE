import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginPostCode({ setLogedIn, setUserInfo }) {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authCode = searchParams.get("code");
    const platform = searchParams.get("state");

    async function authenticate() {
      try {
        if (!authCode || !platform) throw new Error("잘못된 인증 요청입니다.");

        // 백엔드와 연결 실패해도 로그인 상태되도록 구현함 - 채영
        setLogedIn(true);
        setUserInfo({ platform, authCode }); // 플랫폼 인가 코드

        // 토큰 요청
        const platformEndpoints = {
          kakao: import.meta.env.VITE_BACKEND_KAKAO_URL,
          naver: import.meta.env.VITE_BACKEND_NAVER_URL,
          google: import.meta.env.VITE_BACKEND_GOOGLE_URL,
        };
        await axios.post(platformEndpoints[platform], { code: authCode });

        // 성공
        navigate("/");
      } catch (error) {
        setErrorMessage("로그인 실패");
      }
    }

    authenticate();
  }, [searchParams, setLogedIn, setUserInfo, navigate]);

  return (
    <div className="flex h-[100vh] items-center justify-center bg-eventoWhite">
      {errorMessage ? (
        <div className="text-center text-[2rem] font-semibold text-darkRed">
          {errorMessage}
        </div>
      ) : (
        <div className="text-center text-[2rem]">인증 중...</div>
      )}
    </div>
  );
}
