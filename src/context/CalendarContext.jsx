import React, { createContext, useContext, useState } from "react";
import { instance } from "../api/axios";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [myCalendars, setMyCalendars] = useState([]);
  const [subscribedCalendars, setSubscribedCalendars] = useState([]);

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
        setMyCalendars(myCalendarsResponse.data);
      }
      if (subscribedCalendarsResponse?.status === 200) {
        setSubscribedCalendars(subscribedCalendarsResponse.data);
      }
    } catch (error) {
      console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <CalendarContext.Provider
      value={{ myCalendars, subscribedCalendars, fetchData }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendar는 CalendarProvider 내부에서만 사용할 수 있습니다.",
    );
  }
  return context;
};
