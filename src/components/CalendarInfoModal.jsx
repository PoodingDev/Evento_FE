import React, { useEffect, useState } from "react";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaTrashCan, FaXmark } from "react-icons/fa6";

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
  // 초기 값 설정
  const [title, setTitle] = useState(calendar.calendar_name);
  const [detailMemo, setDetailMemo] = useState(calendar.calendar_description);
  const [isPublic, setIsPublic] = useState(calendar.is_public);
  const [calColor, setCalColor] = useState(calendar.calendar_color);
  const [visitCode, setVisitCode] = useState(calendar.invitation_code);

  // 상태 관리
  const [newTitle, setNewTitle] = useState(title);
  const [newDetail, setNewDetail] = useState(detailMemo);
  const [newPublic, setNewPublic] = useState(isPublic);
  const [newColor, setNewColor] = useState(calColor);

  // 수정 및 편집
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const toggleIsPublic = () => setNewPublic(!newPublic);

  // 컴포넌트가 마운트될 때 creator_id와 userId 확인
  useEffect(() => {
    console.log("Calendar Creator ID:", calendar.creator_id);
    console.log("Current User ID:", userId);
  }, [calendar.creator_id, userId]);

  // 저장
  const save = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.patch(
        `/api/calendars/${calendar.calendar_id}`,
        {
          calendar_name: newTitle,
          calendar_description: newDetail,
          is_public: newPublic,
          calendar_color: newColor,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // 서버 응답 성공 시 상태 업데이트
        setTitle(newTitle);
        setDetailMemo(newDetail);
        setIsPublic(newPublic);
        setCalColor(newColor); // 색상 업데이트
        toggleIsEdit();
        onClose(); // 저장 후 모달 닫기
      }
    } catch (error) {
      console.error("캘린더 수정 실패:", error);
      alert("캘린더 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  // 취소
  const cancel = () => {
    setNewTitle(title);
    setNewDetail(detailMemo);
    setNewPublic(isPublic);
    setNewColor(calColor);
    toggleIsEdit();
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
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
        // 삭제가 성공적으로 완료되었을 때
        alert("캘린더가 성공적으로 삭제되었습니다.");
        onClose(); // 삭제 후 모달 닫기
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
        <div className="mb-[2.8rem] flex items-center justify-between">
          {isEdit ? (
            <input
              type="text"
              value={newTitle}
              className="w-full rounded-md bg-lightGray/20 text-[3em] font-bold text-darkGray focus:outline-none"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <div
              className="w-full text-[3em] font-bold"
              style={{ color: calColor }}
            >
              {title}
            </div>
          )}
        </div>
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            멤버
          </div>
          <div className="w-[40rem] text-[1.1rem] font-semibold text-darkGray">
            호도니, 뚜디니, 때용이 + 10
          </div>
        </div>
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
              value={newDetail}
              className="mb-[3rem] mr-[2rem] h-[1.3rem] w-[18rem] rounded-md bg-lightGray/20 text-[1.1rem] font-semibold text-darkGray"
              onChange={(e) => setNewDetail(e.target.value)}
            />
            <div className="flex h-[2rem] w-[10rem] items-center">
              {[
                { color: "#FF5C5C", label: "calendarRed" },
                { color: "#FFC960", label: "calendarYellow" },
                { color: "#7DBE7E", label: "calendarGreen" },
                { color: "#9CC9FF", label: "calendarLightBlue" },
                { color: "#6D87D5", label: "calendarBlue" },
                { color: "#8867DF", label: "calendarDarkPurple" },
                { color: "#B469D3", label: "calendarPurple" },
              ].map(({ color, label }) => (
                <button
                  key={label}
                  onClick={() => setNewColor(color)}
                  className={`relative mb-[0.25rem] mr-[0.3rem] flex h-[1rem] w-[1rem] items-center justify-center`}
                  style={{ backgroundColor: color }}
                >
                  {newColor === color && (
                    <FaCheck className="absolute text-[0.6rem] text-eventoWhite" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mb-[3rem] h-[1.3rem] w-[20rem] text-[1.1rem] font-semibold text-darkGray">
              {detailMemo}
            </div>
            <div
              className="h-[1.38rem] w-[1.5rem]"
              style={{ backgroundColor: calColor }}
            />
          </div>
        )}
        <div className="flex">
          <div className="mb-[0.7rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 공개 여부
          </div>
          <div className="mb-[0.7rem] text-[1rem] font-bold text-eventoPurple">
            초대 코드
          </div>
        </div>
        {isEdit ? (
          <>
            <div className="flex space-x-[6.5rem]">
              <div className="flex items-center space-x-[1rem] text-center">
                <div className="text-[1.1rem] font-semibold text-darkGray">
                  비공개 캘린더로 설정하기
                </div>
                {newPublic ? (
                  <FaToggleOff
                    size={25}
                    className="cursor-pointer text-eventoPurple"
                    onClick={toggleIsPublic}
                  />
                ) : (
                  <FaToggleOn
                    size={25}
                    className="cursor-pointer text-eventoPurple"
                    onClick={toggleIsPublic}
                  />
                )}
              </div>
              <div className="pr-[0.5rem] text-[1.1rem] font-semibold text-darkGray">
                {visitCode}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <div className="w-[20rem] text-[1.1rem] font-semibold text-darkGray">
                {isPublic ? "공개" : "비공개"}
              </div>
              <div className="pr-[0.5rem] text-[1.1rem] font-semibold text-darkGray">
                {visitCode}
              </div>
              <CopyToClipboard
                className="cursor-pointer text-eventoPurple active:text-lightGray"
                text={visitCode}
              >
                <FaRegCopy />
              </CopyToClipboard>
            </div>
          </>
        )}
      </div>
      {isEdit ? (
        <div className="absolute bottom-[2rem] right-[2rem] flex space-x-[0.5rem]">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
            onClick={cancel}
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
            onClick={toggleIsEdit}
          />
          {calendar.creator_id === userId && (
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
