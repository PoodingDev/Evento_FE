import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchUserInfo, requestSocialLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function KakaoGoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();
  const { setLoggedIn, setUserInfo } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      const authCode = searchParams.get("code");

      if (!authCode) {
        setErrorMessage("잘못된 인증 요청입니다.");
        setIsAuthenticating(false);
        return;
      }

      try {
        // 로그인 요청 (네이버 따로)
        const response = await requestSocialLogin(authCode, platform);

        const { access: accessToken, refresh: refreshToken } = response;

        // 토큰 저장
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // 사용자 정보 가져오기
        const userInfo = await fetchUserInfo(accessToken);

        // 전역 상태 업데이트
        setLoggedIn(true);
        setUserInfo(userInfo);

        // 캘린더 페이지로 이동
        navigate("/calendar");
      } catch (error) {
        console.error("Authentication error:", error);

        // 에러 메시지 설정
        if (error.response?.status === 401) {
          setErrorMessage("유효하지 않은 인증 코드입니다.");
        } else if (error.response?.status === 403) {
          setErrorMessage("이 소셜 계정으로는 로그인할 수 없습니다.");
        } else {
          setErrorMessage("인증에 실패했습니다. 다시 시도해 주세요.");
        }
      } finally {
        setIsAuthenticating(false);
      }
    };

    authenticate();
  }, [searchParams, setLoggedIn, setUserInfo, navigate]);

  return (
    <div className="flex h-[100vh] items-center justify-center bg-eventoWhite">
      {isAuthenticating ? (
        <div className="text-center text-[2rem]">인증 중...</div>
      ) : errorMessage ? (
        <div className="text-center text-[2rem] font-semibold text-darkRed">
          {errorMessage}
        </div>
      ) : null}
    </div>
  );
}
