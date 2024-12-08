import React, { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

export default function DeleteCalendarModal({ calendar, onClose, onDelete }) {

  const handleDeleteCalendar = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `/api/calendars/${calendar.calendar_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert("캘린더가 성공적으로 삭제되었습니다.");
        onClose();
        onDelete();
      }
    } catch (error) {
      console.error("캘린더 삭제 실패:", error);
      alert("캘린더 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  return (
    <div className="h-[23rem] w-[35rem] translate-x-[3rem] items-center justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[2.8rem] top-[2.8rem]"
        onClick={onClose}
      />
      <p className="mb-[1.4rem] mt-[1.8rem] w-[24.4rem] text-[2rem] font-bold text-eventoPurple">
        삭제하시겠어요?
      </p>
      <p className="mb-[6.8rem] w-[24.4rem] text-[1.25rem] font-bold text-lightGray">
        캘린더가 삭제되며 복구되지 않습니다.
      </p>
      <div className="flex justify-end space-x-[0.4rem]">
        <button
          onClick={handleDeleteCalendar}
          className="flex h-[3rem] w-[7.5rem] items-center justify-center rounded-[0.625rem] border-[0.15rem] border-solid border-darkRed text-center text-[1.2rem] font-bold text-darkRed hover:bg-darkRed/50 active:bg-darkRed">
          <span>캘린더 삭제</span>
        </button>
        <button
          onClick={onClose}
          className="flex h-[3rem] w-[7.5rem] items-center justify-center rounded-[0.625rem] border-[0.15rem] border-solid border-lightGray text-center text-[1.2rem] font-bold text-lightGray hover:bg-lightGray/50 active:bg-lightGray">
          <span>돌아가기</span>
        </button>
      </div>
    </div>
  );
}
