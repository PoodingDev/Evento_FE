import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { FaCaretDown, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[28rem] w-[48rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="일정을 입력하세요"
            className="mb-[0.5rem] w-[30rem] bg-transparent text-[2.8rem] font-bold"
          />
          <FaXmark size={25} />
        </div>

        <div className="mb-[2.8rem] flex w-[10rem] justify-center rounded-[3rem] bg-eventoYellow text-center text-[1.2rem] font-bold leading-[1.7rem]">
          <FaCaretDown size={25} />
          <p>Pooding팀</p>
        </div>

        {/* 시간 */}

        <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="mb-[1.8rem] flex text-[2rem] font-medium">
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
        <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
          일정 상세
        </div>

        <input
          type="text"
          placeholder="무슨 일정인가요?"
          className="mb-[1.8rem] w-[40rem] bg-transparent text-[1.5rem] font-medium"
        />

        {/* 기타 아이콘 */}
        <div className="flex flex-wrap justify-between">
          <p className="text-[1.2rem] font-medium text-eventoPurple">
            구독자에게 공개
          </p>
          <FaToggleOn size={25} />
          <div className="ml-[17rem] h-[3rem] w-[5.2rem] rounded-[0.5rem] border-[0.1rem] border-solid border-eventoPurple text-center text-[1.2rem] font-medium leading-[3rem] text-eventoPurple">
            취소
          </div>
          <div className="h-[3rem] w-[5.2rem] rounded-[0.5rem] border-[0.1rem] border-solid bg-eventoPurple text-center text-[1.2rem] font-medium leading-[3rem] text-eventoWhite">
            저장
          </div>
        </div>
      </div>
    </div>
  );
}
