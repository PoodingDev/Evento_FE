import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function LogIn() {
  function handleLogin(platform) {
    let clientId = "";
    let authUrl = "";

    // const redirectUri = `https://evento.kro.kr/auth/${platform}`; //배포용
    const redirectUri = `http://localhost:5173/auth/${platform}`;

    const state = encodeURIComponent(JSON.stringify({ platform }));

    switch (platform) {
      case "kakao":
        clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
        authUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=$kakao`;
        break;

      case "naver":
        clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
        authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=$naver`;
        break;

      case "google":
        clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
&state=google`;
        break;

      default:
        console.error("지원하지 않는 플랫폼입니다.");
        return;
    }

    console.log("Auth URL:", authUrl);
    console.log("State:", state);

    window.location.href = authUrl;
  }

  return (
    <div className="h-[100vh] bg-eventoWhite">
      <div className="flex h-full -translate-y-[1rem] flex-col items-center justify-center">
        <img
          className="h-[5rem] translate-x-[0.7rem]"
          src="/assets/evento_logo.png"
          alt="Evento"
        />
        <div className="mt-[2rem] text-[1rem] text-eventoPurpleBase/80">
          간편한 일정 관리
        </div>
        <div className="mt-[0.5rem] text-[1rem] text-eventoPurpleBase/80">
          <span className="font-bold">evento.</span>와 함께 시작하세요!
        </div>
        <div className="mt-[6rem] space-y-[0.7rem] text-[0.9rem]">
          {/* 카카오 */}
          <div
            className="relative flex h-[2.5rem] w-[15rem] cursor-pointer items-center rounded-lg bg-[#FEE500] text-[#181600]/85"
            onClick={() => handleLogin("kakao")}
          >
            <img
              src="/assets/kakao_logo.png"
              className="absolute left-2 ml-[0.6rem] h-[1rem]"
              alt="K"
            />
            <span className="w-full text-center">카카오 연동하기</span>
          </div>
          {/* 네이버 */}
          <div
            className="relative flex h-[2.5rem] w-[15rem] cursor-pointer items-center rounded-lg bg-[#03C75A] text-eventoWhite"
            onClick={() => handleLogin("naver")}
          >
            <img
              src="/assets/naver_logo.png"
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
              src="/assets/google_logo.png"
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
