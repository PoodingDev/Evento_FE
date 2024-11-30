import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestSocialLogin } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPostCode() {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setLoggedIn, setUserInfo } = useAuth(); // useAuth 사용하여 상태 함수 가져오기

  useEffect(() => {
    const authCode = searchParams.get("code");
    const platform = searchParams.get("state");

    async function authenticate() {
      if (!authCode || !platform) {
        setErrorMessage("잘못된 인증 요청입니다.");
        return;
      }

      try {
        console.log(
          "Authenticating for platform:",
          platform,
          "code:",
          authCode,
        );

        const response = await requestSocialLogin(platform, authCode);
        console.log("Authentication success:", response);

        // 로컬 스토리지에 토큰 저장
        localStorage.setItem("token", response.token);

        // 사용자 정보 상태 설정
        setLoggedIn(true);
        setUserInfo({ ...response.userInfo, token: response.token });

        // 홈 화면으로 이동
        navigate("/");
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
