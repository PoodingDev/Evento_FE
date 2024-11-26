import React from "react";
import { FaXmark } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";

export default function CreateCalendar() {
  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[30rem] w-[38rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="캘린더 이름을 입력하세요"
            className="mb-[2.8rem] w-[22.5rem] w-[28rem] bg-transparent text-[2.25rem] font-bold"
          />
          <FaXmark size={25} />
        </div>

        {/* 상세 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          캘린더 상세
        </div>
        <input
          type="text"
          placeholder="어떤 캘린더인가요?"
          className="mb-[2.5rem] w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent text-[1rem] font-bold"
        />

        {/* 공개 여부 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          캘린더 공개 여부
        </div>
        <div className="mb-[2rem] flex w-[40rem] text-[1.25rem] font-bold">
          <p className="mr-[0.5rem] leading-[1.7rem]">
            비공개 캘린더로 설정하기
          </p>
          <FaToggleOn size={25} />
        </div>

        {/* 색상 */}
        <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
          색상
        </div>
        <div className="flex h-[3rem] w-[7.5rem] flex-wrap items-center rounded-[0.2rem] bg-lightGray p-[0.5rem]">
          <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarYellow"></div>
          <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarRed"></div>
          <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarGreen"></div>
          <div className="mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarLightBlue"></div>
          <div className="mb-[0.25rem] h-[1rem] w-[1rem] bg-calendarDarkPurple"></div>
          <div className="mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarBlue"></div>
          <div className="mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarPurple"></div>
        </div>

        <div className="flex justify-end">
          <div className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple text-center text-[1.2rem] text-eventoWhite">
            <span>참가</span>
          </div>
        </div>
      </div>
    </div>
  );
}
