import React from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

export default function CalendarInfo() {
  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[28rem] w-[48rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <div className="text-calendarYellow mb-[2rem] text-[3rem] font-black">
            Pooding팀
          </div>
          <FaXmark size={25} />
        </div>

        {/* 멤버 */}
        <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
          멤버
        </div>
        <div className="mb-[3rem] w-[40rem] text-[1.2rem] font-bold">
          호도니, 뚜디니, 때용이 + 10
        </div>

        {/* 시간 */}
        <div className="flex">
          <div className="mb-[0.8rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 상세
          </div>
          <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
            색상
          </div>
        </div>
        <div className="flex">
          <div className="mb-[3rem] w-[20rem] text-[1.2rem] font-bold">
            푸우가 코딩한다
          </div>
          <div className="bg-calendarYellow h-[1.5rem] w-[1.5rem]"></div>
        </div>

        {/* 일정 상세 */}
        <div className="flex">
          <div className="mb-[0.8rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 공개 여부
          </div>
          <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
            초대 코드
          </div>
        </div>
        <div className="flex">
          <div className="w-[20rem] text-[1.2rem] font-bold">비공개</div>
          <div className="pb-[0.8rem] text-[1.2rem] font-bold">GW5F4</div>
        </div>

        {/* 기타 아이콘 */}
        <div className="ml-[40.5rem]">
          <FaPen size={25} />
        </div>
      </div>
    </div>
  );
}
