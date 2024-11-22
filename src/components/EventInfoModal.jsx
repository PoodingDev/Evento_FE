import React from "react";
import { FaXmark } from "react-icons/fa6";

import {
  FaLock,
  FaBookmark,
  FaRegTrashAlt,
  FaPen,
  FaCommentAlt,
} from "react-icons/fa";

export default function EventInfo() {
  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[28rem] w-[48rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <div className="text-[2.8rem] font-bold">저녁 약속</div>
          <div className="p-[0.3rem_25rem_2rem_0]">
            <FaLock size={25} />
          </div>
          <FaXmark size={25} />
        </div>
        <div className="bg-eventoYellow mb-[3.3rem] h-[1.5rem] w-[10rem] rounded-[3rem] text-center text-[1.2rem] font-bold leading-[1.7rem]">
          Pooding팀
        </div>

        {/* 시간 */}
        <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="mb-[2rem] w-[40rem] text-[2rem] font-medium">
          2024-9-10 - 2024-9-10
        </div>

        {/* 일정 상세 */}
        <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
          일정 상세
        </div>
        <div className="w-[40rem] pb-[3.5rem] text-[1.5rem] font-medium">
          고기 먹자!
        </div>

        {/* 기타 아이콘 */}
        <div className="flex flex-wrap justify-between">
          <FaCommentAlt size={25} />
          <div className="pr-[32rem]">
            <FaBookmark size={25} />
          </div>
          <FaRegTrashAlt size={25} />
          <FaPen size={25} />
        </div>
      </div>
    </div>
  );
}
