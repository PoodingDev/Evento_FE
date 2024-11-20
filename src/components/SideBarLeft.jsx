import React, { useState } from "react";
import {
  FaRegSquare,
  FaCheckSquare,
  FaPen,
  FaPlus,
  FaSignInAlt,
} from "react-icons/fa";

// 더미 데이터
const myCalendars = [
  { id: "1", label: "PoodingDev", color: "text-[#4685FF]" },
  { id: "2", label: "캘린이의 삶", color: "text-[#F36F6F]" },
  { id: "3", label: "학교 시험", color: "text-[#03C75A]" },
  { id: "4", label: "운동Day", color: "text-[#FFC960]" },
];

const subscribedCalendars = [
  { id: "5", label: "therock", description: "Dwayne Johnson" },
  { id: "6", label: "bts.bighitofficial", description: "BTS" },
  { id: "7", label: "dlwlrma", description: "IU" },
  { id: "8", label: "xxxibgdrgn", description: "G-DRAGON" },
  { id: "9", label: "songkang_b", description: "송강" },
];

const dDayItems = [
  { day: "D-1", description: "evento 배포" },
  { day: "D-6", description: "푸딩즈 회식!" },
  { day: "D-69", description: "졸업 언제하냐" },
];

export default function SideBarLeft() {
  const [checked, setChecked] = useState({});

  const handleToggle = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="evento-sidebarleft absolute mt-[5rem] h-[calc(100vh-5rem)] w-[18rem] rounded-tr-[2.5rem] bg-[#F1F1F1] pl-[2.25rem] pr-[1.75rem] pt-[1.6rem]">
      <div>
        {/* 내 캘린더 */}
        <div className="evento-my-calendar text-[0.9rem] text-[#646464]">
          {/* 제목 */}
          <div className="mr-[0.3rem] flex items-center justify-between">
            <span>내 캘린더</span>
            <div className="flex space-x-1">
              <FaSignInAlt className="text-[0.7rem] text-[#646464]" />
              <FaPlus className="text-[0.7rem] text-[#646464]" />
            </div>
          </div>
          {/* 캘린더 리스트 */}
          <ul className="m-[1rem] font-bold">
            {myCalendars.map((calendar) => (
              <li key={calendar.id} className="flex items-center gap-[0.5rem]">
                <div
                  className="cursor-pointer"
                  onClick={() => handleToggle(calendar.id)}
                >
                  {checked[calendar.id] ? (
                    <FaCheckSquare
                      className={`text-[0.9rem] ${calendar.color}`}
                    />
                  ) : (
                    <FaRegSquare
                      className={`text-[0.9rem] ${calendar.color}`}
                    />
                  )}
                </div>
                <label
                  htmlFor={calendar.id}
                  className={`${calendar.color} text-[0.9rem]`}
                >
                  {calendar.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 중간선 */}
      <hr className="m-[0.8rem] border-[0.1px] border-[#646464]/50" />
      {/* 구독한 캘린더 */}
      <div className="mt-6">
        <div className="evento-subscription mb-2 text-[0.9rem] text-[#646464]">
          {/* 제목 */}
          <div className="ml-[0.3rem] mr-[0.3rem] flex items-center justify-between">
            <span>구독한 캘린더</span>
            <FaPen className="text-[0.7rem] text-[#646464]"></FaPen>
          </div>
          {/* 캘린더 리스트 */}
          <ul className="m-[1rem]">
            {subscribedCalendars.map((calendar) => (
              <li key={calendar.id} className="flex items-center space-x-2">
                <div
                  className="cursor-pointer"
                  onClick={() => handleToggle(calendar.id)}
                >
                  {checked[calendar.id] ? (
                    <FaCheckSquare className="text-[0.9rem] text-[#493282]" />
                  ) : (
                    <FaRegSquare className="text-[0.9rem] text-[#493282]" />
                  )}
                </div>
                <label
                  htmlFor={calendar.id}
                  className="flex items-center text-[0.9rem] text-[#493282]"
                >
                  {calendar.label}
                  <span className="ml-2 text-[0.7rem] text-[#646464]">
                    {calendar.description}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* 디데이 */}
      <div className="fixed bottom-[4rem] left-[4rem] flex flex-col items-center justify-center">
        <ul className="space-y-[1.2rem]">
          {dDayItems.map((item, index) => (
            <li key={index} className="flex">
              <span className="w-[3rem] text-left font-bold text-[#493282]">
                {item.day}
              </span>
              <span className="flex-1 pl-2 text-left text-[0.9rem] text-[#646464]">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
