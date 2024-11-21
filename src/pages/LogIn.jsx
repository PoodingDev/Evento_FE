import React from "react";

export default function LogIn() {
  return (
    // 배경 그라데이션 적용 시: from-eventoPurpleLight to-eventoWhite bg-gradient-to-b
    <div className="bg-eventoWhite h-[100vh]">
      <div className="flex flex-col items-center justify-center h-full">
        <img src="/src/assets/logo/event_logo.png" alt="Evento" />
        <div className="text-eventoPurpleBase/70 mt-[1rem] text-[1rem]">
          간편한 일정 관리
        </div>
        <div className="text-eventoPurpleBase/70 text-[1rem]">
          <span className="font-bold">evento.</span>와 함께 시작하세요!
        </div>
        <div className="mt-[2rem] space-y-[1rem]">
          <div className="flex h-[3.3rem] w-[20rem] cursor-pointer items-center justify-center rounded-lg bg-[#FEE500]/90 font-bold text-[#181600]">
            카카오톡 로그인
          </div>
          <div className="text-eventoWhite flex h-[3.3rem] w-[20rem] cursor-pointer items-center justify-center rounded-lg bg-[#03C75A]/90 font-bold">
            네이버 로그인
          </div>
          <div className="flex h-[3.3rem] w-[20rem] cursor-pointer items-center justify-center rounded-lg bg-[#F2F2F2]/90 font-bold text-[#555]">
            구글 로그인
          </div>
        </div>
      </div>
    </div>
  );
}
