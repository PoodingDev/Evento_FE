import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { FaCaretDown, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateEvent({ onClose }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  return (
    <div className="w-[43rem flex h-[29rem] w-[37rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="flex w-full flex-col">
        <div className="mb-[1rem] flex items-center justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="일정 이름을 입력하세요"
            className="w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
          />
        </div>
        <div className="mb-[1.5rem] flex h-[2rem] w-[9rem] justify-center rounded-[2.5rem] bg-eventoYellow text-center text-[1rem] font-bold">
          <div className="flex -translate-x-[0.3rem] items-center">
            <FaCaretDown size={25} />
            <p>Pooding팀</p>
          </div>
        </div>

        {/* 시간 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
          <span className="w-[2rem] text-center">-</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setendDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
        </div>

        {/* 일정 상세 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            일정 상세
          </div>
          <input
            type="text"
            placeholder="어떤 일정인가요?"
            className="border- w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
          />
        </div>

        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            이벤트 공개 여부
          </div>
          <div className="flex items-center space-x-[0.5rem] text-[1rem] text-darkGray">
            <p>구독자들에게 공개하기</p>
            <FaToggleOn
              size={25}
              className="cursor-pointer text-eventoPurple"
            />
          </div>
        </div>
        <div className="absolute bottom-[2rem] right-[3rem] mt-[5rem] flex translate-x-[1rem] justify-end space-x-[0.5rem]">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
            onClick={onClose}
          >
            <span>취소</span>
          </button>
          <button className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50">
            <span>저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
