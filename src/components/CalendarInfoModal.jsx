import DeleteCalendarModal from "./DeleteCalendarModal";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaTrashCan, FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";
import { useAuth } from "../context/AuthContext";

import {
  FaCheck,
  FaCopy,
  FaPen,
  FaRegCopy,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";

export default function CalendarInfo({ calendar, onClose, userId }) {
  const user_id = localStorage.getItem("user_id");
  const [calendarState, setCalendarState] = useState({
    name: calendar.name,
    description: calendar.description,
    isPublic: calendar.is_public,
    color: calendar.color,
    invitation_code: calendar.invitation_code,
    admins: calendar.admins,
    creator_id: calendar.creator_id,
  });
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // 상태 변경 핸들러;
  const updateState = (key, value) => {
    setCalendarState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const save = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      console.log(calendarState);
      const response = await instance.patch(
        `/api/calendars/${calendar.calendar_id}/`,
        {
          name: calendarState.name,
          description: calendarState.description,
          is_public: calendarState.isPublic,
          color: calendarState.color,
          creator: calendarState.creator,
          invitation_code: calendarState.invitation_code,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // 상태 업데이트 및 편집 종료
        resetState();
        onClose();
      }
    } catch (error) {
      console.error("캘린더 수정 실패:", error);
      alert("캘린더 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  const resetState = () => {
    setCalendarState({
      name: calendar.name,
      description: calendar.description,
      isPublic: calendar.is_public,
      color: calendar.color,
      invitation_code: calendar.invitation_code,
      admins: calendar.admins,
    });
    setIsEdit(false);
  };

  // 삭제 핸들러
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.delete(
        `/api/calendars/${calendar.calendar_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 204) {
        // alert("캘린더가 성공적으로 삭제되었습니다.");
        setDeleteModalOpen(false); // 삭제
        onClose(); // 인포
      }
    } catch (error) {
      console.error("캘린더 삭제 실패:", error);
      alert("캘린더 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      {!isDeleteModalOpen && (
        <div className="flex h-[29rem] w-[43rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
          <FaXmark
            size={25}
            className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
            onClick={onClose}
          />
          <div className="flex w-full flex-col">
            <div className="mb-[2.8rem] flex justify-between">
              {isEdit ? (
                <input
                  type="text"
                  value={calendarState.name}
                  className="h-[3.8rem] w-[35rem] rounded-md bg-lightGray/20 text-[3em] font-bold text-darkGray focus:outline-none"
                  onChange={(e) => updateState("name", e.target.value)}
                />
              ) : (
                <div
                  className="flex h-[3.8rem] w-[35rem] items-center rounded-md text-[3em] font-bold focus:outline-none"
                  style={{ color: calendarState.color }}
                >
                  {calendarState.name}
                </div>
              )}
            </div>
            {/* 캘린더 멤버 */}
            <div className="mb-[2rem]">
              <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                멤버
              </div>
              <div className="w-[40rem] text-[1rem] text-darkGray/90">
                {calendar?.admins?.length > 0
                  ? calendar.admins.join(", ")
                  : "나만의 캘린더"}
              </div>
            </div>
            {/* 상세 및 색상 */}
            <div className="flex space-x-[15.5rem]">
              <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                캘린더 상세
              </div>
              <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                색상
              </div>
            </div>
            {isEdit ? (
              <div className="flex">
                <input
                  type="text"
                  value={calendarState.description}
                  className="mb-[3rem] mr-[2rem] flex h-[1.5rem] w-[18rem] items-center rounded-md bg-lightGray/20 text-[1.1rem] font-semibold text-darkGray"
                  onChange={(e) => updateState("description", e.target.value)}
                />
                <div className="ml-[0.2rem] flex h-[2rem] w-[10rem]">
                  {[
                    { color: "#E05C5C", label: "calendarRed" },
                    { color: "#FFC960", label: "calendarYellow" },
                    { color: "#7DBE7E", label: "calendarGreen" },
                    { color: "#9CC9FF", label: "calendarLightBlue" },
                    { color: "#6D87D5", label: "calendarBlue" },
                    { color: "#8867DF", label: "calendarDarkPurple" },
                    { color: "#B469D3", label: "calendarPurple" },
                  ].map(({ color, label }) => (
                    <button
                      key={label}
                      onClick={() => updateState("color", color)}
                      className="relative mr-[0.3rem] flex h-[1rem] w-[1rem] items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      {calendarState.color === color && (
                        <FaCheck className="absolute text-[0.6rem] text-eventoWhite" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="mb-[3rem] flex h-[1.5rem] w-[20rem] items-center text-[1.1rem] font-semibold text-darkGray">
                  {calendarState.description}
                </div>
                <div
                  className="ml-[0.2rem] h-[1rem] w-[1rem] items-center"
                  style={{ backgroundColor: calendarState.color }}
                />
              </div>
            )}
            {/* 공개 여부 및 초대 코드 */}
            <div className="flex">
              <div className="mb-[0.7rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
                캘린더 공개 여부
              </div>
              <div className="mb-[0.7rem] text-[1rem] font-bold text-eventoPurple">
                초대 코드
              </div>
            </div>
            {isEdit ? (
              <div className="flex space-x-[6.5rem]">
                <div className="flex space-x-[1rem] text-center">
                  <div className="flex h-[1rem] items-center text-[1.1rem] font-semibold text-darkGray">
                    비공개 캘린더로 설정하기
                  </div>
                  {calendarState.isPublic ? (
                    <FaToggleOff
                      size={25}
                      className="cursor-pointer text-eventoPurple"
                      onClick={() => updateState("isPublic", false)}
                    />
                  ) : (
                    <FaToggleOn
                      size={25}
                      className="cursor-pointer text-eventoPurple"
                      onClick={() => updateState("isPublic", true)}
                    />
                  )}
                </div>
                <div className="pr-[0.5rem] text-[1.1rem] font-semibold text-darkGray">
                  {calendarState.invitation_code}
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="flex h-[1rem] w-[20rem] items-center text-[1.1rem] font-semibold text-darkGray">
                  {calendarState.isPublic ? "공개" : "비공개"}
                </div>
                <div className="pr-[0.5rem] text-[1.1rem] font-semibold text-darkGray">
                  {calendarState.invitation_code}
                </div>
                <CopyToClipboard
                  className="cursor-pointer text-eventoPurple active:text-lightGray"
                  text={calendarState.invitation_code}
                >
                  <FaRegCopy />
                </CopyToClipboard>
              </div>
            )}
          </div>
          {isEdit ? (
            <div className="absolute bottom-[2rem] right-[2rem] flex space-x-[0.5rem]">
              <button
                className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
                onClick={resetState}
              >
                <span>취소</span>
              </button>
              <button
                onClick={save}
                className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50"
              >
                <span>저장</span>
              </button>
            </div>
          ) : (
            <div className="absolute bottom-[3rem] right-[3rem] flex space-x-[0.5rem]">
              <FaPen
                className="cursor-pointer text-[1.5rem] text-darkGray"
                onClick={() => setIsEdit(true)}
              />
              {calendar.creator_id == user_id && (
                <FaTrashCan
                  className="cursor-pointer text-[1.5rem] text-darkGray"
                  onClick={() => setDeleteModalOpen(true)}
                />
              )}
            </div>
          )}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && (
        <DeleteCalendarModal
          onDelete={handleDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
}
