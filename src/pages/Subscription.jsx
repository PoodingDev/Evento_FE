import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../api/axios";
import { useAuth } from "../context/AuthContext";

import {
  IoChevronBack,
  IoPersonCircleOutline,
  IoSearch,
} from "react-icons/io5";

export default function Subscription() {
  const user_id = localStorage.getItem("user_id");
  const [subscribedCalendars, setSubscribedCalendars] = useState([]);
  const [filteredSearch, setFilteredSearch] = useState([]);

  const toggleSearchSubscription = async (calendar) => {
    console.log("Search에서 토글 요청 캘린더:", calendar);
    try {
      const token = localStorage.getItem("token");
      const { calendar_id: id } = calendar;

      if (!id) {
        throw new Error("캘린더 ID가 유효하지 않습니다.");
      }

      if (calendar.is_subscribed) {
        // 구독 취소
        await instance.delete(`/api/calendars/subscriptions/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFilteredSearch((prev) =>
          prev.map((item) =>
            item.calendar_id === id ? { ...item, is_subscribed: false } : item,
          ),
        );

        // subscribedCalendars에서 제거
        setSubscribedCalendars((prev) =>
          prev.filter((item) => item.calendar_id !== id),
        );
      } else {
        // 구독 추가
        const response = await instance.post(
          `/api/calendars/subscriptions/`,
          { calendar_id: id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.status === 201) {
          setFilteredSearch((prev) =>
            prev.map((item) =>
              item.calendar_id === id ? { ...item, is_subscribed: true } : item,
            ),
          );

          // subscribedCalendars에 추가
          setSubscribedCalendars((prev) => [
            ...prev,
            { ...calendar, is_subscribed: true },
          ]);
        }
      }
    } catch (error) {
      console.error("Search에서 구독 상태 변경 중 오류 발생:", error);
    }
  };

  const toggleSubscribedCalendar = async (calendar) => {
    console.log("Subscribed에서 토글 요청 캘린더:", calendar);
    try {
      const token = localStorage.getItem("token");

      await instance.delete(`/api/calendars/subscriptions/${calendar.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSubscribedCalendars((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Subscribed에서 구독 상태 변경 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get(`/api/calendars/subscriptions/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // 초기 데이터 로드
          const initializedCalendars = response.data.map((calendar) => ({
            ...calendar,
            is_subscribed: true, // 구독 상태 설정
          }));

          console.log("구독한 캘린더 데이터:", initializedCalendars); // 디버깅 로그
          setSubscribedCalendars(initializedCalendars);
        } else {
          console.error("구독한 캘린더를 가져오지 못했습니다.");
        }
      } catch (error) {
        console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    if (user_id) {
      fetchData();
    }
  }, [user_id]);

  return (
    <div className="h-[100vh] bg-eventoWhite pl-[18rem] pt-[4rem]">
      <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
        <Link to="/">
          <IoChevronBack className="text-[1.2rem]" />
        </Link>
        <p className="text-[1.1rem]">&nbsp; 공개 캘린더</p>
      </div>
      <div className="flex w-full">
        <CalenderSearch
          filteredSearch={filteredSearch}
          setFilteredSearch={setFilteredSearch}
          toggleSubscription={toggleSearchSubscription} // Search용 함수 전달
        />

        <SubscriptionCalender
          openCalendars={subscribedCalendars}
          toggleSubscription={toggleSubscribedCalendar} // Subscribed용 함수 전달
        />
      </div>
    </div>
  );
}

function CalenderSearch({
  filteredSearch,
  setFilteredSearch,
  toggleSubscription,
}) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    async function fetchCalendars() {
      if (!debouncedInput.trim()) {
        setFilteredSearch([]);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const response = await instance.get(
          `/api/calendars/search/${debouncedInput}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.status === 200) {
          const updatedResults = response.data.map((calendar) => ({
            ...calendar,
            is_subscribed: calendar.is_subscribed,
          }));
          setFilteredSearch(updatedResults);
        }
      } catch (error) {
        console.error("캘린더 검색 중 오류 발생:", error);
        setFilteredSearch([]);
      }
    }
    fetchCalendars();
  }, [debouncedInput]);

  return (
    <section className="flex w-2/3 flex-col items-center py-[3rem] align-middle">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          placeholder="닉네임을 검색하세요"
          onChange={(event) => setInputValue(event.target.value)}
          className="focus: rounded-2xl bg-gray-200 p-[2px] px-3 py-2 text-center focus:border-[1px] focus:border-eventoPurple/80 focus:bg-eventoPurpleLight/80 focus:outline-none"
        />
        <IoSearch className="text-[2rem]" />
      </div>
      <ul className="my-[2rem] flex w-auto flex-col">
        {filteredSearch.map((calendar) => (
          <li
            key={calendar.calendar_id}
            className="my-2 flex w-[20rem] items-center gap-[1rem]"
          >
            <IoPersonCircleOutline className="h-[3rem] w-[3rem] object-cover" />
            <div>
              <h3 className="text-eventoPurpleDark">{calendar.name}</h3>
              <p className="text-darkGray">
                {calendar.creator_nickname || "알 수 없음"}
              </p>
            </div>
            <button
              className={`ml-auto h-[2rem] w-[5rem] rounded-[0.625rem] border-2 p-1 align-middle ${
                calendar.is_subscribed
                  ? "border-darkRed bg-white text-darkRed"
                  : "border-darkRed bg-darkRed text-white"
              }`}
              onClick={() => toggleSubscription(calendar)}
            >
              {calendar.is_subscribed ? "구독 취소" : "구독"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SubscriptionCalender({ openCalendars, toggleSubscription }) {
  return (
    <>
      <div className="relative after:absolute after:bottom-0 after:left-0 after:top-0 after:w-[2px] after:bg-gray-200 after:content-['']"></div>
      <section className="flex w-1/3 flex-col items-center">
        <h1>구독한 캘린더</h1>
        <ul className="mt-[2rem] flex w-auto flex-col">
          {openCalendars.map((calendar) => (
            <li
              key={calendar.calendar_id}
              className="mt-[0.5rem] flex items-center gap-[1rem]"
            >
              <IoPersonCircleOutline className="h-[2.5rem] w-[2.5rem] object-cover text-eventoPurpleDark/70" />

              <h3 className="text-[1rem] font-medium text-eventoPurpleDark/80">
                {calendar.name}
              </h3>
              <p className="text-[0.9rem] text-darkGray/80">
                {calendar.description}
              </p>

              {/* <button
                className={`ml-auto h-[2rem] w-[5rem] rounded-[0.625rem] border-2 p-1 align-middle ${
                  calendar.is_subscribed
                    ? "border-darkRed bg-white text-darkRed"
                    : "border-darkRed bg-darkRed text-white"
                }`}
                onClick={() => toggleSubscription(calendar)}
              >
                {calendar.is_subscribed ? "구독 취소" : "구독"}
              </button> */}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
