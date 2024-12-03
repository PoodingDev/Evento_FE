import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUserInfo, requestSocialLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPostCode() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn, setUserInfo } = useAuth();

  useEffect(() => {
    const authCode = searchParams.get("code");
    const platform = searchParams.get("state");

    async function authenticate() {
      if (!authCode || !platform) {
        setErrorMessage("잘못된 인증 요청입니다.");
        return;
      }

      try {
        // 로그인 요청
        const response = await requestSocialLogin(platform, authCode);
        const { token } = response;

        // 토큰 저장
        localStorage.setItem("token", token);

        // 사용자 정보 가져오기
        const userInfo = await fetchUserInfo(token);
        console.log("User Info:", userInfo);

        // 전역 상태 업데이트
        setLoggedIn(true);
        setUserInfo(userInfo);

        // 캘린더 화면으로 이동
        navigate("/calendar");
      } catch (error) {
        setErrorMessage("인증에 실패했습니다. 다시 시도해 주세요.");
        console.error("Authentication error:", error);
      }
    }

    authenticate();
  }, [searchParams, setLoggedIn, setUserInfo, navigate]);

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
