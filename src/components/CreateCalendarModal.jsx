import React, { useRef } from "react";
import { FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateCalendar({ onClose }) {
  const inputRefs = useRef([]);

  return (
    <div className="w-[43rem flex h-[29rem] w-[37rem] translate-x-[3rem] items-center justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <div className="flex w-full flex-col">
        <div className="mb-[2.8rem] flex items-center justify-between">
          <input
            type="text"
            placeholder="캘린더 이름을 입력하세요"
            className="w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
          />
          <FaXmark
            size={25}
            className="cursor-pointer text-darkGray"
            onClick={onClose}
          />
        </div>

        {/* 캘린더 상세 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 상세
          </div>
          <input
            type="text"
            placeholder="어떤 캘린더인가요?"
            className="border- w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
          />
        </div>

        {/* 공개 여부 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 공개 여부
          </div>
          <div className="flex items-center space-x-[0.5rem] text-[1rem] font-bold text-darkGray/80">
            <p>비공개 캘린더로 설정하기</p>
            <FaToggleOn
              size={25}
              className="cursor-pointer text-eventoPurple"
            />
          </div>
        </div>

        {/* 색상 선택 */}
        <div>
          <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
            색상
          </div>
          <div className="flex h-[3rem] w-[11rem] flex-wrap items-center rounded-[0.2rem] p-[0.5rem]">
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarYellow"></div>
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarRed"></div>
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarGreen"></div>
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarLightBlue"></div>
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarDarkPurple"></div>
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarBlue"></div>
            <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarPurple"></div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end">
          <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/80 text-center text-[1.2rem] text-eventoWhite hover:bg-eventoPurple/80 active:bg-eventoPurple/60">
            <span>생성</span>
          </button>
        </div>
      </div>
    </div>
  );
}
