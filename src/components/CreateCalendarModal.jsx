import React from "react";
import { FaXmark } from "react-icons/fa6";
import { FaToggleOn } from "react-icons/fa";

export default function CreateCalendar() {
  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[28rem] w-[38rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="캘린더 이름을 입력하세요"
            className="mb-[2rem] w-[28rem] text-[2.7rem] font-bold"
          />
          <FaXmark size={25} />
        </div>

        {/* 상세 */}
        <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
          캘린더 상세
        </div>
        <input
          type="text"
          placeholder="어떤 캘린더인가요?"
          className="mb-[2rem] w-[20rem] border-b-[0.1rem] border-solid border-eventoPurple text-[1rem] font-bold"
        />

        {/* 공개 여부 */}
        <div className="mb-[0.6rem] text-[1rem] font-bold text-eventoPurple">
          캘린더 공개 여부
        </div>
        <div className="mb-[2rem] flex w-[40rem] text-[1rem] font-bold">
          <p className="mr-[1rem] leading-[1.7rem]">비공개 캘린더로 설정하기</p>
          <FaToggleOn size={25} />
        </div>

        {/* 색상 */}
        <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
          색상
        </div>
        <div className="bg-lightGray flex h-[4.8rem] w-[10.5rem] flex-wrap items-center rounded-[0.2rem] p-[0.5rem]">
          <div className="bg-calendarYellow mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
          <div className="bg-calendarRed mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
          <div className="bg-calendarGreen mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
          <div className="bg-calendarLightBlue mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
          <div className="bg-calendarDarkPurple h-[1.5rem] w-[1.5rem]"></div>
          <div className="bg-calendarBlue mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
          <div className="bg-calendarPurple mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
        </div>
      </div>
    </div>
  );
}
