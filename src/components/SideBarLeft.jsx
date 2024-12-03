import CalendarInfo from "./CalendarInfoModal";
import CreateCalendar from "./CreateCalendarModal";
import InviteCodeModal from "./InviteCodeModal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaRegSquare,
  FaCheckSquare,
  FaPen,
  FaPlus,
  FaSignInAlt,
} from "react-icons/fa";

export default function SideBarLeft() {
  const [isCalendarInfoOpen, setCalendarInfoOpen] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [myCalendars, setMyCalendars] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateCalendarOpen, setIsCreateCalendarOpen] = useState(false);

  const { loggedIn, userInfo, setLoggedIn } = useAuth();

  // 내 캘린더 데이터 가져오기
  useEffect(() => {
    async function fetchCalendars() {
      try {
        const token = localStorage.getItem("token"); // 토큰 가져오기
        const response = await axios.get("/api/calendars/admins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setMyCalendars(response.data);
        }
      } catch (error) {
        console.error("캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }

    fetchCalendars();
    // fetchUser();
  }, [isCalendarInfoOpen, isCreateCalendarOpen]);

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

  // 캘린더 정보 보기 및 수정 저장 핸들러
  const handleViewCalendar = (calendar) => {
    setSelectedCalendar(calendar);
    setCalendarInfoOpen(true);
  };

  const handleSaveCalendar = (updatedCalendar) => {
    // 수정된 내용을 사이드바에도 즉시 반영
    setMyCalendars((prevCalendars) =>
      prevCalendars.map((calendar) =>
        calendar.calendar_id === updatedCalendar.calendar_id
          ? updatedCalendar
          : calendar,
      ),
    );
    setCalendarInfoOpen(false);
  };

  return (
    <div>
      <div className="evento-sidebarleft absolute mt-[5rem] h-[calc(100vh-5rem)] w-[18rem] rounded-tr-[2.5rem] bg-eventoGray pl-[2.25rem] pr-[1.75rem] pt-[1.6rem]">
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
            <ul className="m-[1rem] mt-[1.5rem] space-y-[0.5rem]">
              {myCalendars.map((calendar) => (
                <li
                  key={calendar.calendar_id}
                  className="flex items-center space-x-[0.5rem]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleToggle(calendar.calendar_id)}
                  >
                    {checked[calendar.calendar_id] ? (
                      <FaCheckSquare
                        className="text-[0.93rem]"
                        style={{ color: calendar.calendar_color }}
                      />
                    ) : (
                      <FaRegSquare
                        className="text-[0.93rem]"
                        style={{ color: calendar.calendar_color }}
                      />
                    )}
                  </div>
                  <label
                    htmlFor={calendar.calendar_id}
                    className="cursor-pointer text-[0.9rem] font-medium"
                    style={{ color: calendar.calendar_color }}
                    onClick={() => handleViewCalendar(calendar)}
                  >
                    {calendar.calendar_name}
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
                className="cursor-pointer text-[0.75rem] text-darkGray"
                onClick={() => navigate("/subscription")}
              />
            </div>
            {/* 캘린더 리스트 */}
            <ul className="m-[1rem] mt-[1.5rem] space-y-[0.5rem]">
              {subscribedCalendars.map((calendar) => (
                <li
                  key={calendar.id}
                  className="flex items-center space-x-[0.5rem]"
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
                    className="flex items-center text-[0.9rem] font-medium text-eventoPurpleBase"
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
                <span className="flex-1 pl-2 text-left text-[0.93rem] text-[#646464]">
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
      {isCalendarInfoOpen && selectedCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CalendarInfo
            calendar={selectedCalendar}
            onClose={() => setCalendarInfoOpen(false)}
            onSave={handleSaveCalendar}
            userId={userInfo.user_id} // 현재 로그인한 사용자 ID 전달
          />
        </div>
      )}
    </div>
  );
}

// 기존 더미 데이터 사용 - 구독한 캘린더
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
