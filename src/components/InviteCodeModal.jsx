import React, { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";

export default function InviteCodeModal({ onClose, calendarId }) {
  const inputRefs = useRef([]);
  const [inviteCode, setInviteCode] = useState("");

  const handleInputChange = (e, index) => {
    let value = e.target.value;

    // 숫자 및 영어 대소문자만 입력 가능
    if (/^[a-zA-Z0-9]$/.test(value)) {
      // 입력값을 대문자로 변환
      value = value.toUpperCase();
      e.target.value = value;

      // 초대 코드를 조합하여 업데이트
      const newCode = inputRefs.current.map((input) => input.value).join("");
      setInviteCode(newCode);

      // 입력 후 다음 칸으로 포커스 이동
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      // 잘못된 입력 제거
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // 현재 칸이 비어있고 이전 칸으로 이동
      if (index > 0 && e.target.value === "") {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInviteAdmin = async () => {
    if (inviteCode.length === 6) {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.post(
          `/api/calendars/admins/invite/`,
          { invitation_code: inviteCode },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          alert("관리자로 성공적으로 초대되었습니다.");
          onClose();
        }
      } catch (error) {
        console.error("관리자 초대 실패:", error);
        alert("유효하지 않은 초대 코드입니다. 다시 시도해 주세요.");
      }
    } else {
      alert("참가 코드는 6자리입니다");
    }
  };

  return (
    <div className="flex h-[29rem] w-[43rem] translate-x-[3rem] items-center justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="text-center">
        <div className="mb-[2rem] text-[4rem] font-semibold text-eventoPurple/80">
          초대 코드
        </div>
        <div className="mb-[2rem] mt-[4rem] flex justify-center gap-[1.4rem]">
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              className="h-[5rem] w-[4.75rem] rounded-[0.5rem] bg-lightGray/70 text-center text-[4rem] font-semibold focus:bg-eventoPurple/80 focus:outline-none"
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>
        <div className="text-[1.5rem] text-darkGray/80">
          공유 받은 참여 코드를 입력하세요!
        </div>
        <div className="mt-[4.2rem] flex translate-x-[1rem] justify-end space-x-[0.5rem]">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
            onClick={onClose}
          >
            <span>취소</span>
          </button>
          <button
            onClick={handleInviteAdmin}
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50"
          >
            <span>참가</span>
          </button>
        </div>
      </div>
    </div>
  );
}
