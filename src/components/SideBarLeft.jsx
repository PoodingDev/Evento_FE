import CalendarInfo from "./CalendarInfoModal";
import CreateCalendar from "./CreateCalendarModal";
import InviteCodeModal from "./InviteCodeModal";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isCalendarInfoOpen, setCalendarInfoOpen] = useState(false);
  const toggleCalendarInfo = () => {
    setCalendarInfoOpen((prev) => !prev);
  };
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateCalendarOpen, setIsCreateCalendarOpen] = useState(false);

  const handleToggle = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleInvite = () => {
    setIsInviteOpen((prev) => !prev);
  };
  const toggleCreateCalendar = () => {
    setIsCreateCalendarOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="evento-sidebarleft bg-eventoGray absolute mt-[5rem] h-[calc(100vh-5rem)] w-[18rem] rounded-tr-[2.5rem] pl-[2.25rem] pr-[1.75rem] pt-[1.6rem]">
        <div>
          {/* 내 캘린더 */}
          <div className="evento-my-calendar">
            {/* 제목 */}
            <div className="mr-[0.3rem] flex items-center justify-between">
              <span className="text-[0.9rem] text-darkGray">내 캘린더</span>
              <div className="flex space-x-[0.5rem]">
                <FaSignInAlt
                  className="cursor-pointer text-[0.9rem] text-darkGray"
                  onClick={toggleInvite}
                />
                <FaPlus
                  className="cursor-pointer text-[0.9rem] text-darkGray"
                  onClick={toggleCreateCalendar}
                />
              </div>
            </div>
            {/* 캘린더 리스트 */}
            <ul className="m-[1rem] mt-[1.5rem] space-y-[0.5rem] font-semibold">
              {myCalendars.map((calendar) => (
                <li
                  key={calendar.id}
                  className="flex items-center space-x-[0.75rem]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleToggle(calendar.id)}
                  >
                    {checked[calendar.id] ? (
                      <FaCheckSquare
                        className={`text-[0.93rem] ${calendar.color}`}
                      />
                    ) : (
                      <FaRegSquare
                        className={`text-[0.93rem] ${calendar.color}`}
                      />
                    )}
                  </div>
                  <label
                    htmlFor={calendar.id}
                    className={`${calendar.color} text-[0.9rem]`}
                    onClick={toggleCalendarInfo}
                  >
                    {calendar.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 구독한 캘린더 */}
        <div className="mt-[2rem]">
          <div className="evento-subscription">
            {/* 제목 */}
            <div className="mr-[0.3rem] flex items-center justify-between">
              <span className="text-[0.9rem] text-darkGray">구독한 캘린더</span>
              <FaPen
                className="cursor-pointer text-[0.9rem] text-darkGray"
                onClick={() => navigate("/subscription")}
              ></FaPen>
            </div>
            {/* 캘린더 리스트 */}
            <ul className="m-[1rem] mt-[1.5rem] space-y-[0.5rem]">
              {subscribedCalendars.map((calendar) => (
                <li
                  key={calendar.id}
                  className="flex items-center space-x-[0.75rem]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleToggle(calendar.id)}
                  >
                    {checked[calendar.id] ? (
                      <FaCheckSquare className="text-[0.9rem] text-eventoPurpleBase" />
                    ) : (
                      <FaRegSquare className="text-[0.9rem] text-eventoPurpleBase" />
                    )}
                  </div>
                  <label
                    htmlFor={calendar.id}
                    className="flex items-center text-[0.9rem] text-eventoPurpleBase"
                  >
                    {calendar.label}
                    <span className="ml-2 text-[0.7rem] font-light text-darkGray">
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
                <span className="w-[3rem] text-left font-bold text-eventoPurpleBase">
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
      {/* 모달들 */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <InviteCodeModal onClose={toggleInvite} />
        </div>
      )}
      {isCreateCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CreateCalendar onClose={toggleCreateCalendar} />
        </div>
      )}
      {isCalendarInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CalendarInfo onClose={toggleCalendarInfo} />
        </div>
      )}
    </div>
  );
}
