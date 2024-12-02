import React, { useRef, useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateCalendar({ onClose }) {
  const inputRefs = useRef([]);

  //캘린더 제목
  const [title, setTitle] = useState("");

  //캘린더 상세
  const [detailMemo, setDetailMemo] = useState("");

  //공개 여부
  const [isPublic, setIsPublic] = useState(false);
  const toggleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  //색상
  const [calColor, setCalColor] = useState("calendarRed");

  return (
    <div className="w-[43rem flex h-[29rem] w-[37rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="flex w-full flex-col">
        <div className="mb-[2.8rem] flex items-center justify-between">
          <input
            type="text"
            placeholder="캘린더 이름을 입력하세요"
            className="w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        {/* 캘린더 상세 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 상세
          </div>
          <input
            type="text"
            placeholder="어떤 캘린더인가요?"
            className="border- w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
            onChange={(e) => {
              setDetailMemo(e.target.value);
            }}
          />
        </div>

        {/* 공개 여부 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 공개 여부
          </div>
          <div className="flex items-center space-x-[0.5rem] text-[1rem] font-bold text-darkGray/80">
            <p>비공개 캘린더로 설정하기</p>
            {isPublic ? (
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
        </div>

        {/* 색상 선택 */}
        <div>
          <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
            색상
          </div>
          <div className="flex h-[3rem] w-[11rem] flex-wrap items-center rounded-[0.2rem] p-[0.5rem]">
            <button
              onClick={() => setCalColor("calendarYellow")}
              className={
                calColor === "calendarYellow"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarYellow"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarYellow"
              }
            ></button>
            <button
              onClick={() => setCalColor("calendarRed")}
              className={
                calColor === "calendarRed"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarRed"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarRed"
              }
            ></button>
            <button
              onClick={() => setCalColor("calendarGreen")}
              className={
                calColor === "calendarGreen"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarGreen"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarGreen"
              }
            ></button>
            <button
              onClick={() => setCalColor("calendarLightBlue")}
              className={
                calColor === "calendarLightBlue"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarLightBlue"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarLightBlue"
              }
            ></button>
            <button
              onClick={() => setCalColor("calendarDarkPurple")}
              className={
                calColor === "calendarDarkPurple"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarDarkPurple"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarDarkPurple"
              }
            ></button>
            <button
              onClick={() => setCalColor("calendarBlue")}
              className={
                calColor === "calendarBlue"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarBlue"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarBlue"
              }
            ></button>
            <button
              onClick={() => setCalColor("calendarPurple")}
              className={
                calColor === "calendarPurple"
                  ? "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarPurple"
                  : "mb-[0.25rem] mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarPurple"
              }
            ></button>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end">
          <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/80 text-center text-[1.2rem] text-eventoWhite hover:bg-eventoPurple/80 active:bg-eventoPurple/60">
            <span>생성</span>
          </button>
        </div>
      </div>
    </div>
  );
}
