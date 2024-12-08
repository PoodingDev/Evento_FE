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
  FaTrash,
} from "react-icons/fa";
export default function CalendarInfo({ calendar, onClose, userId }) {
  // 통합 상태 관리
  const [calendarState, setCalendarState] = useState({
    title: calendar.calendar_name,
    detailMemo: calendar.calendar_description,
    isPublic: calendar.is_public,
    calColor: calendar.calendar_color,
    visitCode: calendar.invitation_code,
  });

  const { loggedIn, userInfo, setLoggedIn } = useAuth();
  const [isEdit, setIsEdit] = useState(false);

  // 상태 변경 핸들러
  const updateState = (key, value) => {
    setCalendarState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 상태 초기화 함수
  const resetState = () => {
    setCalendarState({
      title: calendar.calendar_name,
      detailMemo: calendar.calendar_description,
      isPublic: calendar.is_public,
      calColor: calendar.calendar_color,
      visitCode: calendar.invitation_code,
    });
    setIsEdit(false);
  };

  // 컴포넌트가 마운트될 때 creator_id와 userId 확인
  useEffect(() => {
    console.log("Calendar Creator ID:", calendar.creator_id);
    console.log("Current User ID:", userInfo.user_id);
  }, [calendar.creator_id, userId]);

  // 저장
  const save = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await instance.patch(
        `/api/calendars/${calendar.calendar_id}/`,
        {
          calendar_name: calendarState.title,
          calendar_description: calendarState.detailMemo,
          is_public: calendarState.isPublic,
          calendar_color: calendarState.calColor,
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

  // 삭제
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

      if (response.status === 200) {
        alert("캘린더가 성공적으로 삭제되었습니다.");
        onClose();
      }
    } catch (error) {
      console.error("캘린더 삭제 실패:", error);
      alert("캘린더 삭제에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
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
              value={calendarState.title}
              className="h-[3.8rem] w-[35rem] rounded-md bg-lightGray/20 text-[3em] font-bold text-darkGray focus:outline-none"
              onChange={(e) => updateState("title", e.target.value)}
            />
          ) : (
            <div
              className="flex h-[3.8rem] w-[35rem] items-center rounded-md text-[3em] font-bold focus:outline-none"
              style={{ color: calendarState.calColor }}
            >
              {calendarState.title}
            </div>
          )}
        </div>
        {/* 캘린더 멤버 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            멤버
          </div>
          <div className="w-[40rem] text-[1.1rem] font-semibold text-darkGray">
            {calendar?.members?.length > 0
              ? calendar.members.map((member) => member.nickname).join(", ")
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
              value={calendarState.detailMemo}
              className="mb-[3rem] mr-[2rem] flex h-[1.5rem] w-[18rem] items-center rounded-md bg-lightGray/20 text-[1.1rem] font-semibold text-darkGray"
              onChange={(e) => updateState("detailMemo", e.target.value)}
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
                  onClick={() => updateState("calColor", color)}
                  className="relative mr-[0.3rem] flex h-[1rem] w-[1rem] items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  {calendarState.calColor === color && (
                    <FaCheck className="absolute text-[0.6rem] text-eventoWhite" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mb-[3rem] flex h-[1.5rem] w-[20rem] items-center text-[1.1rem] font-semibold text-darkGray">
              {calendarState.detailMemo}
            </div>
            <div
              className="ml-[0.2rem] h-[1rem] w-[1rem] items-center"
              style={{ backgroundColor: calendarState.calColor }}
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
              {calendarState.visitCode}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="flex h-[1rem] w-[20rem] items-center text-[1.1rem] font-semibold text-darkGray">
              {calendarState.isPublic ? "공개" : "비공개"}
            </div>
            <div className="pr-[0.5rem] text-[1.1rem] font-semibold text-darkGray">
              {calendarState.visitCode}
            </div>
            <CopyToClipboard
              className="cursor-pointer text-eventoPurple active:text-lightGray"
              text={calendarState.visitCode}
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
          {calendar.creator === userInfo.user_id && (
            <FaTrashCan
              className="cursor-pointer text-[1.5rem] text-darkGray"
              onClick={handleDelete}
            />
          )}
        </div>
      )}
    </div>
  );
}
