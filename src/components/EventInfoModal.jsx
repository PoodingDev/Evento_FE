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
    <div className="ml-[18rem] flex h-screen items-center justify-center">
      <div className="h-[450px] w-[750px] rounded-[20px] p-[40px] shadow-[0px_0px_10px_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          <div className="text-[64px] font-bold">저녁 약속</div>
          <div className="p-[25px_380px_0px_0px]">
            <FaLock size={25} />
          </div>
          <FaXmark size={25} />
        </div>
        <div className="mb-[50px] w-[160px] rounded-[50px] bg-[#FFC960] text-center text-[20px] font-bold">
          Pooding팀
        </div>

        {/* 시간 */}
        <div className="text-[16px] font-bold text-[#8867DF]">시간</div>
        <div className="mb-[20px] w-[700px] text-[32px] font-medium">
          2024-9-10 - 2024-9-10
        </div>

        {/* 일정 상세 */}
        <div className="text-[16px] font-bold text-[#8867DF]">일정 상세</div>
        <div className="w-[700px] pb-[100px] text-[24px] font-medium">
          고기 먹자!
        </div>

        {/* 기타 아이콘 */}
        <div className="flex flex-wrap justify-between">
          <FaCommentAlt size={25} />
          <div className="pr-[500px]">
            <FaBookmark size={25} />
          </div>
          <FaRegTrashAlt size={25} />
          <FaPen size={25} />
        </div>
      </div>
    </div>
  );
}
