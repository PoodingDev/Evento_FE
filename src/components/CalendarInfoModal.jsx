import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaPen, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CalendarInfo({ onClose }) {
  //수정 및 편집
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //공개
  const [isPublic, setIsPublic] = useState(false);
  const [newPublic, setNewPublic] = useState(isPublic);
  const toggleIsPublic = () => setNewPublic(!newPublic);

  //제목
  const [title, setTitle] = useState("Pooding팀");
  const [newTitle, setNewTitle] = useState(title);

  //상세
  const [detailMemo, setDetailMemo] = useState("푸우가 코딩한다");
  const [newDetail, setNewDetail] = useState(detailMemo);

  // 색상
  const [calColor, setCalColor] = useState("calendarRed");
  const [newColor, setNewColor] = useState(calColor);

  const [textColor, setTextColor] = useState("");
  useEffect(() => {
    if (calColor === "calendarYellow") {
      setTextColor("text-calendarYellow");
    } else if (calColor === "calendarRed") {
      setTextColor("text-calendarRed");
    } else if (calColor === "calendarGreen") {
      setTextColor("text-calendarGreen");
    } else if (calColor === "calendarLightBlue") {
      setTextColor("text-calendarLightBlue");
    } else if (calColor === "calendarDarkPurple") {
      setTextColor("text-calendarDarkPurple");
    } else if (calColor === "calendarBlue") {
      setTextColor("text-calendarBlue");
    } else if (calColor === "calendarPurple") {
      setTextColor("text-calendarPurple");
    }
  }, [calColor]);

  //초대코드
  const [visitCode, setVisitCode] = useState("GW5F4");

  //저장
  const save = () => {
    setTitle(newTitle);
    setIsPublic(newPublic);
    setDetailMemo(newDetail);
    setCalColor(newColor);
    toggleIsEdit();
  };

  //취소
  const cancle = () => {
    setNewTitle(title);
    setNewPublic(isPublic);
    setNewDetail(detailMemo);
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
          {/* 제목 */}
          {isEdit ? (
            <input
              type="text"
              value={newTitle}
              className="w-full rounded-md bg-lightGray/20 text-[3em] font-bold text-darkGray focus:outline-none"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
          ) : (
            <input
              type="text"
              value={title}
              className={`w-full bg-transparent text-[3em] font-bold ${textColor} focus:outline-none`}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              disabled
            />
          )}
        </div>
        {/* 멤버 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            멤버
          </div>
          <div className="w-[40rem] text-[1.1rem] font-bold text-darkGray">
            호도니, 뚜디니, 때용이 + 10
          </div>
        </div>

        {/* 일정 상세 */}
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
              onChange={(e) => {
                setNewDetail(e.target.value);
              }}
            />
            <div className="flex h-[2rem] w-[10rem] items-center">
              <button
                onClick={() => setNewColor("calendarYellow")}
                className={
                  newColor === "calendarYellow"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarYellow"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarYellow"
                }
              ></button>
              <button
                onClick={() => setNewColor("calendarRed")}
                className={
                  newColor === "calendarRed"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarRed"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarRed"
                }
              ></button>
              <button
                onClick={() => setNewColor("calendarGreen")}
                className={
                  newColor === "calendarGreen"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarGreen"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarGreen"
                }
              ></button>
              <button
                onClick={() => setNewColor("calendarLightBlue")}
                className={
                  newColor === "calendarLightBlue"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarLightBlue"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarLightBlue"
                }
              ></button>
              <button
                onClick={() => setNewColor("calendarDarkPurple")}
                className={
                  newColor === "calendarDarkPurple"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarDarkPurple"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarDarkPurple"
                }
              ></button>
              <button
                onClick={() => setNewColor("calendarBlue")}
                className={
                  newColor === "calendarBlue"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarBlue"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarBlue"
                }
              ></button>
              <button
                onClick={() => setNewColor("calendarPurple")}
                className={
                  newColor === "calendarPurple"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarPurple"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarPurple"
                }
              ></button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <input
              type="text"
              value={detailMemo}
              className="mb-[3rem] h-[1.3rem] w-[20rem] bg-transparent text-[1.1rem] font-bold text-darkGray"
              onChange={(e) => {
                setDetailMemo(e.target.value);
              }}
              disabled
            />
            <div className={`h-[1.38rem] w-[1.5rem] bg-${calColor}`}></div>
          </div>
        )}

        {/* 공개 여부 */}
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
                GW5F4
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
                {`${visitCode}`}
              </div>
              <CopyToClipboard
                className="cursor-pointer text-eventoblack active:text-darkGray"
                text={`${visitCode}`}
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
            onClick={cancle}
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
