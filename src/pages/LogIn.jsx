import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function LogIn() {
  function handleLogin(platform) {
    let redirectUrl = "";
    let redirectUri = "";
    let clientId = "";

    switch (platform) {
      case "kakao":
        clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
        redirectUri = encodeURIComponent("http://localhost:5173/auth");
        redirectUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
        break;
      // case "naver":
      //   clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
      //   break;
      case "google":
        redirectUri = encodeURIComponent("http://localhost:5173/auth");
        clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email profile openid`;
        break;
      default:
        break;
    }
    window.location.href = redirectUrl;
  }

  return (
    <div className="bg-eventoWhite h-[100vh]">
      <div className="flex flex-col items-center justify-center h-full">
        <img
          className="h-[6rem]"
          src="/src/assets/logo/event_logo.png"
          alt="Evento"
        />
        <div className="text-eventoPurpleBase/80 mt-[0.5rem] text-[1rem]">
          간편한 일정 관리
        </div>
        <div className="text-eventoPurpleBase/80 mt-[0.5rem] text-[1rem]">
          <span className="font-bold">evento.</span>와 함께 시작하세요!
        </div>
        <div className="mt-[2.5rem] space-y-[0.6rem] text-[0.9rem]">
          {/* 카카오 */}
          <div
            className="relative flex h-[2.5rem] w-[15rem] cursor-pointer items-center rounded-lg bg-[#FEE500] text-[#181600]/85"
            onClick={() => handleLogin("kakao")}
          >
            <img
              src="/src/assets/kakao_logo.png"
              className="absolute left-2 ml-[0.6rem] h-[1rem]"
              alt="K"
            />
            <span className="w-full text-center">카카오 연동하기</span>
          </div>
          {/* 네이버 */}
          <div
            className="text-eventoWhite relative flex h-[2.5rem] w-[15rem] cursor-pointer items-center rounded-lg bg-[#03C75A]"
            onClick={() => handleLogin("naver")}
          >
            <img
              src="src/assets/naver_logo.png"
              className="absolute left-2 h-[2.3rem]"
              alt="N"
            />
            <span className="w-full text-center">네이버 연동하기</span>
          </div>
          {/* 구글 */}
          <div
            className="relative flex h-[2.5rem] w-[15rem] cursor-pointer items-center rounded-lg bg-[#F2F2F2]/90 text-[#555]"
            onClick={() => handleLogin("google")}
          >
            <img
              src="src/assets/google_logo.png"
              className="absolute left-2 ml-[0.3rem] h-[1.8rem]"
              alt="G"
            />
            <span className="ml-auto mr-auto">구글로 시작하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
