import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaPen, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CalendarInfo({ calendar, onClose }) {
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

  // 저장
  const save = () => {
    setTitle(newTitle);
    setDetailMemo(newDetail);
    setIsPublic(newPublic);
    setCalColor(newColor);
    toggleIsEdit();
  };

  // 취소
  const cancel = () => {
    setNewTitle(title);
    setNewDetail(detailMemo);
    setNewPublic(isPublic);
    setNewColor(calColor);
    toggleIsEdit();
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
          <div className="w-[40rem] text-[1.1rem] font-bold text-darkGray">
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
              className="mb-[3rem] mr-[2rem] h-[1.3rem] w-[18rem] rounded-md bg-lightGray/20 text-[1.1rem] font-bold text-darkGray"
              onChange={(e) => setNewDetail(e.target.value)}
            />
            <div className="flex h-[2rem] w-[10rem] items-center">
              {[
                "#FF5C5C",
                "#FFC960",
                "#7DBE7E",
                "#9CC9FF",
                "#6D87D5",
                "#8867DF",
                "#B469D3",
              ].map((color, index) => (
                <button
                  key={index}
                  onClick={() => setNewColor(color)}
                  className={`mr-[0.3rem] h-[1rem] w-[1rem] ${
                    newColor === color ? "border-[0.1rem] border-darkGray" : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mb-[3rem] h-[1.3rem] w-[20rem] text-[1.1rem] font-bold text-darkGray">
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
                <div className="text-[1.1rem] font-bold text-darkGray">
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
              <div className="pr-[0.5rem] text-[1.1rem] font-bold text-darkGray">
                {visitCode}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <div className="w-[20rem] text-[1.1rem] font-bold text-darkGray">
                {isPublic ? "공개" : "비공개"}
              </div>
              <div className="pr-[0.5rem] text-[1.1rem] font-bold text-darkGray">
                {visitCode}
              </div>
              <CopyToClipboard
                className="cursor-pointer text-eventoblack active:text-darkGray"
                text={visitCode}
              >
                <FaCopy />
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
        <FaPen
          className="absolute bottom-[3rem] right-[3rem] text-[1.5rem] text-darkGray"
          onClick={toggleIsEdit}
        />
      )}
    </div>
  );
}
