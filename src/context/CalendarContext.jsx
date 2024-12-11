import React, { createContext, useContext, useState } from "react";
import { instance } from "../api/axios";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [myCalendars, setMyCalendars] = useState([]);
  const [subscribedCalendars, setSubscribedCalendars] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // 변경 트리거
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [myCalendarsResponse, subscribedCalendarsResponse] =
        await Promise.all([
          instance.get("/api/calendars/admin/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          instance.get("/api/calendars/subscriptions/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

      if (myCalendarsResponse?.status === 200) {
        console.log("내 캘린더 데이터:", myCalendarsResponse.data); // 디버깅 추가
        setMyCalendars(myCalendarsResponse.data);
      }
      if (subscribedCalendarsResponse?.status === 200) {
        console.log("구독한 캘린더 데이터:", subscribedCalendarsResponse.data); // 디버깅 추가
        setSubscribedCalendars(subscribedCalendarsResponse.data);
      }
    } catch (error) {
      console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        myCalendars,
        setMyCalendars,
        subscribedCalendars,
        setSubscribedCalendars,
        fetchData,
        updateTrigger,
        setUpdateTrigger, 
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("CalendarProvider 외부");
  }
  return context;
};
