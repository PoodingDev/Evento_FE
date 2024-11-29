import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { FaCaretDown, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateEvent({ onClose }) {
  //캘린더 더미데이터
  const data = [
    { id: 1, calName: "PoodingDev" },
    { id: 2, calName: "캘린이의 삶" },
    { id: 3, calName: "학교 시험" },
    { id: 4, calName: "운동Day" },
  ];

  //캘린더 리스트
  const [showCalList, setShowCalList] = useState(false);
  const showList = () => setShowCalList(!showCalList);

  //이벤트 제목(일정 이름)
  const [eventTitle, setEventTitle] = useState("");

  //캘린더 이름
  const [title, setTitle] = useState("Pooding팀");

  //시간
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  //이벤트 상세
  const [detailEventMemo, setDetailEventMemo] = useState("");

  //공개여부
  const [isEventPublic, setIsEventPublic] = useState(true);
  const toggleIsPublic = () => setIsEventPublic(!isEventPublic);

  return (
    <div className="flex h-[29rem] w-[37rem] w-[43rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="flex w-full flex-col">
        <div className="mb-[1rem] flex items-center justify-between">
          {/* 제목 */}
          <input
            type="text"
            placeholder="일정 이름을 입력하세요"
            className="w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
            onChange={(e) => {
              setEventTitle(e.target.value);
            }}
          />
        </div>
        <div className="relative z-20 mb-[1.5rem] flex h-[2rem] w-[9rem] justify-center rounded-[2.5rem] bg-eventoYellow text-center text-[1rem] font-bold">
          <div className="flex h-[1.55rem] -translate-x-[0.3rem] items-center justify-between">
            <FaCaretDown
              size={25}
              onClick={() => {
                showList();
              }}
            />
            <p className="">{`${title}`}</p>
          </div>
          {showCalList && (
            <div className="absolute left-[1.3rem] top-[1.55rem] flex h-[6rem] w-[8rem] flex-col overflow-auto">
              {data.map((cal) => {
                return (
                  <button
                    key={cal.id}
                    className="h-[1.5rem] w-[6.7rem] border-[0.1rem] border-solid border-darkGray bg-lightGray leading-[1.5rem]"
                    onClick={() => {
                      setTitle(`${cal.calName}`);
                    }}
                  >
                    {`${cal.calName}`}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 시간 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="relative z-10 mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
          <span className="w-[2rem] text-center">-</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setendDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
        </div>

        {/* 일정 상세 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            일정 상세
          </div>
          <input
            type="text"
            placeholder="어떤 일정인가요?"
            className="border- w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
            onChange={(e) => {
              setDetailEventMemo(e.target.value);
            }}
          />
        </div>

        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            이벤트 공개 여부
          </div>
          <div className="flex items-center space-x-[0.5rem] text-[1rem] text-darkGray">
            <p>구독자들에게 공개하기</p>
            {isEventPublic ? (
              <FaToggleOn
                size={25}
                className="cursor-pointer text-eventoPurple"
                onClick={toggleIsPublic}
              />
            ) : (
              <FaToggleOff
                size={25}
                className="cursor-pointer text-eventoPurple"
                onClick={toggleIsPublic}
              />
            )}
          </div>
        </div>
        <div className="absolute bottom-[2rem] right-[3rem] mt-[5rem] flex translate-x-[1rem] justify-end space-x-[0.5rem]">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
            onClick={onClose}
          >
            <span>취소</span>
          </button>
          <button className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50">
            <span>저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
