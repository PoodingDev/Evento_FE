import CalendarInfo from "./CalendarInfoModal";
import CreateCalendar from "./CreateCalendarModal";
import InviteCodeModal from "./InviteCodeModal";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/axios";
import { useCalendar } from "../context/CalendarContext";

// import { useAuth } from "context/AuthContext";

import {
  FaRegSquare,
  FaCheckSquare,
  FaPen,
  FaPlus,
  FaSignInAlt,
} from "react-icons/fa";

export default function SideBarLeft() {
  const {
    myCalendars,
    subscribedCalendars,
    fetchData,
    setMyCalendars,
    setSubscribedCalendars,
    updateTrigger,
    setUpdateTrigger,
  } = useCalendar();

  const user_id = localStorage.getItem("user_id");
  const [isCalendarInfoOpen, setCalendarInfoOpen] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateOpen, setIsCreateCalendarOpen] = useState(false);

  const [dday, setDday] = useState([]);
  async function fetchDdayData() {
    try {
      const token = localStorage.getItem("token");
      const ddayResponse = await instance.get(
        `/api/users/${user_id}/favorites/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (ddayResponse?.status === 200) {
        const favoriteEvents = ddayResponse.data.favorite_events || [];
        setDday(favoriteEvents);
      }
    } catch (error) {
      console.error("D-Day 데이터를 가져오는 중 오류 발생:", error);
    }
  }
  useEffect(() => {
    if (user_id) {
      fetchData(); // Fetch calendars
      fetchDdayData(); // Fetch D-Day events
    }
  }, [isCalendarInfoOpen, isCreateOpen]);
  const handleToggle = async (calendar) => {
    try {
      const token = localStorage.getItem("token");
      const updatedIsActive = !calendar.is_active;

      const response = await instance.patch(
        `/api/calendars/subscriptions/update/`,
        { calendar_id: calendar.calendar_id, is_active: updatedIsActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response?.status === 200) {
        setMyCalendars((prevCalendars) =>
          prevCalendars.map((item) =>
            item.calendar_id === calendar.calendar_id
              ? { ...item, is_active: updatedIsActive }
              : item,
          ),
        );

        // checked 상태 업데이트
        setChecked((prevChecked) => ({
          ...prevChecked,
          [calendar.calendar_id]: updatedIsActive,
        }));
      }
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.error("캘린더 토글 중 오류:", error);
    }
  };

  const handleSubToggle = async (calendar) => {
    try {
      const token = localStorage.getItem("token");
      const updatedIsActive = !calendar.is_active;

      const response = await instance.patch(
        `/api/calendars/subscriptions/update-subscription/`,
        { calendar_id: calendar.calendar_id, is_active: updatedIsActive },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response?.status === 200) {
        setSubscribedCalendars((prevCalendars) =>
          prevCalendars.map((item) =>
            item.calendar_id === calendar.calendar_id
              ? { ...item, is_active: updatedIsActive }
              : item,
          ),
        );

        // checked 상태 업데이트
        setChecked((prevChecked) => ({
          ...prevChecked,
          [calendar.calendar_id]: updatedIsActive,
        }));
      }
      setUpdateTrigger(!updateTrigger);
    } catch (error) {
      console.error("캘린더 토글 중 오류:", error);
    }
  };

  useEffect(() => {
    if (myCalendars.length > 0) {
      const myChecked = myCalendars.reduce((acc, calendar) => {
        acc[calendar.calendar_id] = calendar.is_active;
        return acc;
      }, {});
      setChecked((prev) => ({ ...prev, ...myChecked }));
    }
  }, [myCalendars]);

  useEffect(() => {
    if (subscribedCalendars.length > 0) {
      const subChecked = subscribedCalendars.reduce((acc, calendar) => {
        acc[calendar.calendar_id] = calendar.is_active;
        return acc;
      }, {});
      setChecked((prev) => ({ ...prev, ...subChecked }));
    }
  }, [subscribedCalendars]);

  const toggleInvite = () => setIsInviteOpen((prev) => !prev);
  const toggleCreateCalendar = () => setIsCreateCalendarOpen((prev) => !prev);
  const handleViewCalendar = (calendar) => {
    setSelectedCalendar(calendar);
    setCalendarInfoOpen(true);
  };

  const handleSaveCalendar = (updatedCalendar) => {
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
            <ul className="m-[1rem] mt-[1.5rem] space-y-[0.5rem]">
              {myCalendars.map((calendar) => (
                <li
                  key={calendar.calendar_id}
                  className="flex items-center space-x-[0.5rem]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleToggle(calendar)}
                  >
                    {calendar.is_active ? (
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
            <div className="mr-[0.3rem] flex items-center justify-between">
              <span className="text-[0.9rem] text-darkGray">구독한 캘린더</span>
              <FaPen
                className="cursor-pointer text-[0.75rem] text-darkGray"
                onClick={() => navigate("/subscription")}
              />
            </div>
            <ul className="m-[1rem] mt-[1.5rem] space-y-[0.5rem]">
              {subscribedCalendars.map((calendar) => (
                <li
                  key={calendar.calendar_id}
                  className="flex items-center space-x-[0.5rem]"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleSubToggle(calendar)}
                  >
                    {calendar.is_active ? (
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
                    className="flex items-center text-[0.9rem] font-medium text-eventoPurpleBase"
                    onClick={() => handleViewCalendar(calendar)}
                  >
                    {calendar.name}
                    <span className="ml-2 text-[0.7rem] text-darkGray/80">
                      {calendar.creator_nickname}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* D-Day */}
      <div className="fixed bottom-[3rem] left-[4rem] flex flex-col items-center justify-center">
        <ul className="space-y-[.8rem]">
          {(Array.isArray(dday) ? dday : []).map((item, index) => {
            return (
              <li key={index} className="flex items-center">
                <span className="flex w-[3rem] items-center text-left text-[.9rem] font-bold text-eventoPurpleDark/70">
                  {item.d_day}
                </span>
                <span className="flex flex-1 items-center pl-2 text-left text-[0.8rem] text-darkGray/90">
                  {item.event_title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 모달 */}
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
            userId={user_id}
          />
        </div>
      )}
    </div>
  );
}
