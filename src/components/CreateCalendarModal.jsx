import React, { useRef, useState } from "react";
import { FaCheck, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";

export default function CreateCalendar({ onClose }) {
  const inputRefs = useRef([]);

  // 캘린더 제목
  const [title, setTitle] = useState("");

  // 캘린더 상세
  const [detailMemo, setDetailMemo] = useState("");

  // 공개 여부
  const [isPublic, setIsPublic] = useState(false);
  const toggleIsPublic = () => {
    setIsPublic(!isPublic);
  };

  // 색상
  const [calColor, setCalColor] = useState("#E05C5C"); // 초기 값

  // 에러 메시지 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  // 캘린더 생성 요청 핸들러
  const handleCreateCalendar = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      if (!title) {
        throw new Error("캘린더 제목을 입력해주세요.");
      }
      const response = await instance.post(
        "/api/calendars/",
        {
          name: title,
          description: detailMemo,
          is_public: isPublic,
          color: calColor,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        // alert("캘린더가 성공적으로 생성되었습니다!");
        onClose(); // 모달 닫기
      }
    } catch (error) {
      console.error("캘린더 생성 실패:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "캘린더를 생성하지 못했습니다. 다시 시도해 주세요.",
      );
    }
  };

  return (
    <div
      className="flex h-[29rem] w-[43rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50"
      style={{ backgroundColor: `${calColor}40` }}
    >
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
            className="w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
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
          <div className="mb-[0.3rem] text-[1rem] font-bold text-eventoPurple">
            색상
          </div>
          <div className="flex h-[3rem] w-[11rem] flex-wrap items-center rounded-[0.2rem] p-[0.2rem]">
            {[
              { color: "#E05C5C", label: "calendarRed" },
              { color: "#FFC960", label: "calendarYellow" },
              { color: "#7DBE7E", label: "calendarGreen" },
              { color: "#6CC9FF", label: "calendarLightBlue" },
              { color: "#5555D5", label: "calendarBlue" },
              { color: "#8867DF", label: "calendarDarkPurple" },
              { color: "#B469D3", label: "calendarPurple" },
              { color: "#E67C93", label: "calendarPink" },
              { color: "#FF9856", label: "calendarOrange" },
              { color: "#58C9C0", label: "calendarTeal" },
              { color: "#7B93FF", label: "calendarIndigo" },
              { color: "#A6856A", label: "calendarBrown" },
              { color: "#9AC87A", label: "calendarOlive" },
              { color: "#FFA8D9", label: "calendarLavender" },
              { color: "#D86A77", label: "calendarCoral" },
              { color: "#FFD37A", label: "calendarGold" },
            ].map(({ color, label }) => (
              <button
                key={label}
                onClick={() => setCalColor(color)}
                className={`relative mb-[0.25rem] mr-[0.3rem] flex h-[1rem] w-[1rem] items-center justify-center`}
                style={{ backgroundColor: color }}
              >
                {calColor === color && (
                  <FaCheck className="absolute text-[0.6rem] text-eventoWhite" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 에러 메시지 출력 */}
        {errorMessage && (
          <div className="mt-4 text-darkRed">{errorMessage}</div>
        )}

        {/* 하단 버튼 */}
        <div className="flex justify-end">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/80 active:bg-eventoPurple/60"
            onClick={handleCreateCalendar}
          >
            <span>생성</span>
          </button>
        </div>
      </div>
    </div>
  );
}
