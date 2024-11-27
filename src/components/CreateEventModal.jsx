import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { FaCaretDown, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  return (
    <div className="flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[29rem] w-[43rem] rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="일정을 입력하세요"
            className="mb-[0.8rem] w-[30rem] bg-transparent text-[4rem] font-bold"
          />
          <FaXmark size={25} />
        </div>

        <div className="mb-[2.37rem] flex h-[2rem] w-[10rem] justify-center rounded-[2.5rem] bg-eventoYellow text-center text-[1.25rem] font-bold leading-[2rem]">
          <FaCaretDown size={25} />
          <p>Pooding팀</p>
        </div>

        {/* 시간 */}

        <div className="mb-[0.25rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="mb-[2rem] flex text-[2rem] font-bold">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[11rem] bg-transparent"
          />
          <p className="mr-[1rem] w-[1rem]">-</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setendDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[11rem] bg-transparent"
          />
        </div>

        {/* 일정 상세 */}
        <div className="mb-[0.25rem] text-[1rem] font-bold text-eventoPurple">
          일정 상세
        </div>

        <input
          type="text"
          placeholder="무슨 일정인가요?"
          className="mb-[1.8rem] w-[40rem] bg-transparent text-[1.5rem] font-medium"
        />

        {/* 기타 아이콘 */}
        <div className="flex justify-between">
          <div className="flex">
            <p className="w-[8rem] text-[1.2rem] font-medium leading-[3rem] text-eventoPurple">
              구독자에게 공개
            </p>
            <FaToggleOn size={25} className="mt-[0.7rem]" />
          </div>
          <div className="flex space-x-[0.5rem]">
            <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple text-center text-[1.2rem] text-eventoPurple hover:bg-eventoPurpleLight/50 active:bg-eventoPurpleLight">
              <span>취소</span>
            </button>
            <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple text-center text-[1.2rem] text-eventoWhite hover:bg-eventoPurple/80 active:bg-eventoPurple/60">
              <span>저장</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
