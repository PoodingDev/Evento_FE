import CalendarInfo from "./CalendarInfoModal";
import CreateCalendar from "./CreateCalendarModal";
import InviteCodeModal from "./InviteCodeModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/axios";
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

  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateOpen, setIsCreateCalendarOpen] = useState(false);

  const [myCalendars, setMyCalendars] = useState([]);
  const [subscribedCalendars, setSubscribedCalendars] = useState([]);
  const [dday, setDday] = useState([]);

  const { loggedIn, userInfo } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const [myCalendarsResponse, subscribedCalendarsResponse, ddayResponse] =
          await Promise.allSettled([
            instance.get("/api/calendars/admin/", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            instance.get(`/api/calendars/subscriptions/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            instance.get(`/api/users/${userInfo.user_id}/favorites/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        // console.log(myCalendarsResponse);
        if (myCalendarsResponse.status === "fulfilled") {
          setMyCalendars(myCalendarsResponse.value.data);
          const initialChecked = myCalendarsResponse.value.data.reduce(
            (acc, calendar) => {
              acc[calendar.calendar_id] = true;
              return acc;
            },
            {},
          );
          setChecked(initialChecked);
        }

        if (subscribedCalendarsResponse.status === "fulfilled") {
          setSubscribedCalendars(subscribedCalendarsResponse.value.data);
        }

        if (ddayResponse.status === "fulfilled") {
          setDday(ddayResponse.value.data);
        } else {
          setDday([]); // 기본값으로 설정
        }
      } catch (error) {
        console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    if (userInfo?.user_id) {
      fetchData();
    }
  }, [userInfo, isCalendarInfoOpen, isCreateOpen]);

  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.patch(
        `/api/calendars/${id}`,
        {
          calendar_name: myCalendars.name,
          calendar_description: myCalendars.description,
          is_public: myCalendars.is_public,
          calendar_color: myCalendars.color,
          admins: myCalendars.admins,
          isactive: checked[id],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        // 체크 상태 변경
        setChecked((prev) => {
          const newChecked = { ...prev, [id]: !prev[id] }; // 현재 id의 체크 상태 반전
          // myCalendars의 isactive 값을 업데이트
          setMyCalendars((prevCalendars) =>
            prevCalendars.map((calendar) =>
              calendar.calendar_id === id
                ? { ...calendar, isactive: newChecked[id] }
                : calendar,
            ),
          );
          return newChecked;
        });
      }
    } catch (error) {
      console.error("ERROR: ", error);
    }
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
                        style={{ color: calendar.color }}
                      />
                    ) : (
                      <FaRegSquare
                        className="text-[0.93rem]"
                        style={{ color: calendar.color }}
                      />
                    )}
                  </div>
                  <label
                    htmlFor={calendar.calendar_id}
                    className="cursor-pointer text-[0.9rem] font-medium"
                    style={{ color: calendar.color }}
                    onClick={() => handleViewCalendar(calendar)}
                  >
                    {calendar.name}
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
                  key={calendar.calendar_id}
                  className="flex items-center space-x-[0.5rem]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleToggle(calendar.calendar_id)}
                  >
                    {checked[calendar.calendar_id] ? (
                      <FaCheckSquare className="text-[0.9rem] text-eventoPurpleBase" />
                    ) : (
                      <FaRegSquare className="text-[0.9rem] text-eventoPurpleBase" />
                    )}
                  </div>
                  <label
                    htmlFor={calendar.calendar_id}
                    className="flex items-center text-[0.9rem] font-medium text-eventoPurpleBase"
                  >
                    {calendar.name}
                    <span className="ml-2 text-[0.7rem] font-light text-darkGray">
                      {calendar.description}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 모달들 */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <InviteCodeModal onClose={toggleInvite} />
        </div>
      )}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CreateCalendar onClose={toggleCreateCalendar} />
        </div>
      )}
      {isCalendarInfoOpen && selectedCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CalendarInfo
            calendar={selectedCalendar}
            onClose={() => setCalendarInfoOpen(false)}
            userId={userInfo?.user_id}
          />
        </div>
      )}

      <div className="fixed bottom-[3rem] left-[4rem] flex flex-col items-center justify-center">
        <ul className="space-y-[.8rem]">
          {(Array.isArray(dday) ? dday : []).map((item, index) => {
            const today = new Date();
            const dDay = new Date(item.d_day);
            const differenceInTime = dDay - today;
            const differenceInDays = Math.ceil(
              differenceInTime / (1000 * 60 * 60 * 24),
            );

            return (
              <li key={index} className="flex">
                <span className="w-[3rem] text-left text-[.9rem] font-bold text-eventoPurpleDark/70">
                  {differenceInDays > 0
                    ? `D-${differenceInDays}`
                    : differenceInDays === 0
                      ? "D-Day"
                      : `D+${Math.abs(differenceInDays)}`}
                </span>
                <span className="flex-1 pl-2 text-left text-[0.9rem] text-darkGray/90">
                  {item.event_title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
