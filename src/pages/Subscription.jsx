import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  IoChevronBack,
  IoPersonCircleOutline,
  IoSearch,
} from "react-icons/io5";

export default function Subscription() {
  const { loggedIn, userInfo } = useAuth();
  const [subscribedCalendars, setSubscribedCalendars] = useState([]);

  const toggleSubscription = async (id) => {
    const calendar = subscribedCalendars.find(
      (calendar) => calendar.calendar_id === id,
    );

    if (calendar.isSubscribed) {
      // 구독 취소
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/subscriptions/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 상태 업데이트
        setSubscribedCalendars((prevCalendars) =>
          prevCalendars.map((calendar) =>
            calendar.calendar_id === id
              ? { ...calendar, isSubscribed: false }
              : calendar,
          ),
        );
      } catch (error) {
        console.error("구독 취소 중 오류 발생:", error);
      }
    } else {
      console.log("구독 추가 기능은 아직 구현되지 않았습니다.");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const subscribedCalendarsResponse = await axios.get(
          `/api/users/${userInfo.user_id}/subscriptions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (subscribedCalendarsResponse.status === 200) {
          // 상태 초기화
          const initializedCalendars = subscribedCalendarsResponse.data.map(
            (calendar) => ({
              ...calendar,
              isSubscribed: true,
            }),
          );

          setSubscribedCalendars(initializedCalendars);
        }
      } catch (error) {
        console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    if (userInfo?.user_id) {
      fetchData();
    }
  }, [userInfo, subscribedCalendars]);

  return (
    <div className="h-[100vh] flex-col pl-[18rem] pt-[5rem]">
      <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
        <Link to="/">
          <IoChevronBack className="text-[1.4rem]" />
        </Link>
        <p className="text-[1.4rem]">&nbsp; 공개 캘린더</p>
      </div>
      <div className="flex w-full">
        <CaleanderSearch
          openCalendars={subscribedCalendars}
          toggleSubscription={toggleSubscription}
        />
        <SubscriptionCalender
          openCalendars={subscribedCalendars}
          toggleSubscription={toggleSubscription}
        />
      </div>
    </div>
  );
}

function CaleanderSearch({ openCalendars, toggleSubscription }) {
  // 검색창 상태 관리
  const [inputValue, setInputValue] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);

  // 디바운스 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(inputValue); // 디바운스된 검색어 업데이트
    }, 500);
    return () => clearTimeout(timer); // 이전 타이머 클리어
  }, [inputValue]);

  // 검색 결과 업데이트
  useEffect(() => {
    if (!debouncedInput.trim()) {
      setFilteredSearch([]); // 검색어가 없으면 빈 배열 반환
    } else {
      const newFilteredSearch = openCalendars.filter(
        (calendar) =>
          calendar.userNickNam
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          calendar.calendarName
            .toLowerCase()
            .includes(inputValue.toLowerCase()),
      );
      setFilteredSearch(newFilteredSearch); // 상태 업데이트
    }
  }, [debouncedInput, openCalendars]);

  return (
    <section className="flex w-2/3 flex-col items-center justify-center py-[3rem] align-middle">
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
            <IoPersonCircleOutline className="h-[3.5rem] w-[3.5rem] object-cover" />
            <div>
              <h3 className="text-eventoPurpleDark">{calendar.calendarName}</h3>
              <p className="text-darkGray">{calendar.userNickNam}</p>
            </div>
            <button
              className={`ml-auto h-[2rem] w-[5rem] rounded-[0.625rem] border-2 p-1 align-middle ${
                calendar.isSubscribed
                  ? "border-darkRed bg-white text-darkRed"
                  : "border-darkRed bg-darkRed text-white"
              }`}
              onClick={() => toggleSubscription(calendar.calendar_id)}
            >
              {calendar.isSubscribed ? "구독취소" : "구독"}
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
        <ul className="flex w-auto flex-col">
          {openCalendars.map((calendar) => (
            <li
              key={calendar.calendar_id}
              className="my-2 flex items-center gap-[1rem]"
            >
              <IoPersonCircleOutline className="h-[3.5rem] w-[3.7rem] object-cover text-eventoPurpleDark/70" />
              <div>
                <h3 className="text-[1rem] font-medium text-eventoPurpleDark/80">
                  {calendar.calendar_name}
                </h3>
                <p className="text-[0.9rem] text-darkGray/80">
                  {calendar.calendar_description}
                </p>
              </div>
              <button
                className={`ml-auto h-[1.8rem] w-[4.5rem] rounded-[0.625rem] border-2 p-1 align-middle text-[0.9rem] ${
                  calendar.isSubscribed
                    ? "border-darkRed/85 bg-white text-darkRed/85"
                    : "border-darkRed/50 bg-darkRed/85 text-white"
                }`}
                onClick={() => toggleSubscription(calendar.calendar_id)}
              >
                {calendar.isSubscribed ? "구독 취소" : "구독"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
