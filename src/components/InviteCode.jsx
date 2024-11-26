import React, { useRef } from "react";

export default function InviteCode() {
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    let value = e.target.value;

    // 숫자, 알파벳만 입력 가능
    if (!/^[a-zA-Z0-9]*$/.test(value)) {
      e.target.value = "";
      return;
    }

    // 입력값을 대문자로 변환
    e.target.value = value.toUpperCase();

    // 입력 후 다음 칸으로 포커스 이동
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // 백스페이스 처리: 이전 칸으로 포커스 이동
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex h-[29rem] w-[43rem] translate-x-[45rem] translate-y-[15rem] items-center justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <div className="text-center">
        <div className="mb-[2rem] text-[4rem] font-semibold text-eventoPurple">
          초대 코드
        </div>
        <div className="mb-[2rem] mt-[5rem] flex justify-center gap-[1.4rem]">
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
        <div className="mt-[6.5rem] flex justify-end space-x-[0.5rem]">
          <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple text-center text-[1.2rem] text-eventoPurple hover:bg-eventoPurpleLight/50 active:bg-eventoPurpleLight">
            <span>취소</span>
          </button>
          <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple text-center text-[1.2rem] text-eventoWhite hover:bg-eventoPurple/80 active:bg-eventoPurple/60">
            <span>참가</span>
          </button>
        </div>
      </div>
    </div>
  );
}
