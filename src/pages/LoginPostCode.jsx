import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { requestSocialLogin } from "../api/auth";

export default function LoginPostCode({ setLogedIn, setUserInfo }) {
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
        setLogedIn(true);
        setUserInfo({ ...response.userInfo, token: response.token });

        // 홈 화면으로 이동
        navigate("/");
      } catch (error) {
        setErrorMessage("인증에 실패했습니다. 다시 시도해 주세요.");
        console.error("Authentication error:", error);
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
