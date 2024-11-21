import React from "react";

export default function LogIn() {
  return (
    // 배경 그라데이션 적용 시: from-eventoPurpleLight to-eventoWhite bg-gradient-to-b
    <div className="bg-eventoWhite h-[calc(100vh-5rem)]">
      <div className="flex flex-col items-center justify-center h-full">
        <img src="/src/assets/logo/event_logo.png" alt="Evento" />
        <div className="text-eventoPurpleBase/70 mt-[1rem] text-[1rem]">
          간편한 일정 관리
        </div>
        <div className="text-eventoPurpleBase/70 text-[1rem]">
          <span className="font-bold">evento.</span>와 함께 시작하세요!
        </div>
        <div className="mt-[2rem] space-y-[1rem]">
          <div className="relative flex h-[3.3rem] w-[20rem] cursor-pointer items-center rounded-lg bg-[#FEE500] text-[#181600]/85">
            <img
              src="/src/assets/kakao_logo.png"
              className="absolute left-2 ml-[0.8rem] h-[1.1rem]"
              alt="K"
            />
            <span className="w-full text-center">카카오 연동하기</span>
          </div>
          <div className="text-eventoWhite relative flex h-[3.3rem] w-[20rem] cursor-pointer items-center rounded-lg bg-[#03C75A]">
            <img
              src="/src/assets/naver_logo.png"
              className="absolute left-2 h-[2.5rem]"
              alt="K"
            />
            <span className="w-full text-center">네이버 연동하기</span>
          </div>
          <div className="relative flex h-[3.3rem] w-[20rem] cursor-pointer items-center rounded-lg bg-[#F2F2F2]/90 text-[#555]">
            <img
              src="/src/assets/google_logo.png"
              className="absolute left-2 ml-[0.3rem] h-[2rem]"
              alt="K"
            />
            <span className="w-full text-center">구글 연동하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}
