import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { FaToggleOff, FaToggleOn, FaXmark } from "react-icons/fa";

export default function EventEditModal({
  onClose,
  eventDetails,
  setEvents,
  toggleIsEdit,
}) {
  const [newEventInfo, setNewEventInfo] = useState({
    title: eventDetails.title,
    start: new Date(eventDetails.start),
    end: new Date(eventDetails.end),
    description: eventDetails.description,
    isPublic: eventDetails.isPublic,
  });

  const handleSave = () => {
    // API 요청 및 상태 업데이트 로직
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventDetails.id ? { ...event, ...newEventInfo } : event,
      ),
    );
    toggleIsEdit();
  };

  const handleCancel = () => {
    toggleIsEdit();
  };

  return (
    <div className="flex h-[29rem] w-[43rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="flex w-full flex-col">
        {/* 이벤트 제목 */}
        <div className="mb-[1rem] flex items-center">
          <div className="text-darkGray">
            {newEventInfo.isPublic ? <FaToggleOn /> : <FaToggleOff />}
          </div>
          <input
            type="text"
            value={newEventInfo.title}
            onChange={(e) =>
              setNewEventInfo((prev) => ({ ...prev, title: e.target.value }))
            }
            className="ml-[1rem] h-[2.5rem] w-full rounded-md bg-lightGray/20 text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
          />
        </div>

        {/* 일정 시간 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="relative z-10 mb-[2rem] flex w-[25rem] items-center text-[2rem] font-bold text-darkGray">
          <DatePicker
            selected={newEventInfo.start}
            onChange={(date) =>
              setNewEventInfo((prev) => ({ ...prev, start: date }))
            }
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
          <span className="mx-2">-</span>
          <DatePicker
            selected={newEventInfo.end}
            onChange={(date) =>
              setNewEventInfo((prev) => ({ ...prev, end: date }))
            }
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
        </div>

        {/* 일정 상세 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            일정 상세
          </div>
          <textarea
            value={newEventInfo.description}
            onChange={(e) =>
              setNewEventInfo((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full rounded-md bg-lightGray/20 text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
          />
        </div>

        {/* 버튼 */}
        <div className="absolute bottom-[2rem] right-[2rem] flex space-x-[0.5rem]">
          <button
            className="h-[2.5rem] w-[5rem] rounded-[0.5rem] border-[0.15rem] border-eventoPurple text-eventoPurple hover:bg-eventoPurpleLight"
            onClick={handleCancel}
          >
            취소
          </button>
          <button
            className="h-[2.5rem] w-[5rem] rounded-[0.5rem] bg-eventoPurple text-white hover:bg-eventoPurpleDark"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
