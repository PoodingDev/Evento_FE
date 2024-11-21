import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { FaCaretDown, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

// $(".ui-datepicker ").css({ "margin-left": "141px", "margin-top": "-223px" });

export default function EventCreate() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center">
      <div className="h-[450px] w-[750px] rounded-[20px] p-[40px] shadow-[0px_0px_10px_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="일정을 입력하세요"
            className="w-[600px] text-[64px] font-bold"
          />
          <FaXmark size={25} />
        </div>

        <div className="mb-[50px] flex w-[160px] justify-center rounded-[50px] bg-[#FFC960] text-center text-[20px] font-bold">
          <FaCaretDown size={25} />
          <p>Pooding팀</p>
        </div>

        {/* 시간 */}

        <div className="text-[16px] font-bold text-[#8867DF]">시간</div>
        <div className="mb-[20px] flex text-[32px] font-medium">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[180px]"
            datepicker-orientation="bottom right"
          />
          <p className="mr-[10px] w-[30px]">-</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setendDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[180px]"
          />
        </div>

        {/* 일정 상세 */}
        <div className="text-[16px] font-bold text-[#8867DF]">일정 상세</div>

        <input
          type="text"
          placeholder="무슨 일정인가요?"
          className="mb-[100px] w-[700px] text-[24px] font-medium"
        />

        {/* 기타 아이콘 */}
        <div className="flex flex-wrap justify-between">
          <p className="text-[20px] font-medium text-[#8867DF]">
            구독자에게 공개
          </p>
          <FaToggleOn size={25} />
          <div className="ml-[300px] h-[48px] w-[87px] rounded-[10px] border-[1px] border-solid border-[#8867DF] text-center text-[20px] font-medium leading-[45px] text-[#8867DF]">
            취소
          </div>
          <div className="h-[48px] w-[87px] rounded-[10px] border-[1px] border-solid bg-[#8867DF] text-center text-[20px] font-medium leading-[45px] text-white">
            저장
          </div>
        </div>
      </div>
    </div>
  );
}
