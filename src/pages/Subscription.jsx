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
  // 클릭 시 구독 상태 반전
  const toggleSubscription = (id) => {
    setSubscribedCalendars((prevCalendars) =>
      prevCalendars.map((calendar) =>
        calendar.id === id
          ? { ...calendar, isSubscribed: !calendar.isSubscribed } // 구독 상태 반전
          : calendar,
      ),
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const [subscribedCalendarsResponse] = await Promise.all([
          axios.get(`/api/users/${userInfo.user_id}/subscriptions`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (subscribedCalendarsResponse.status === 200) {
          setSubscribedCalendars(subscribedCalendarsResponse.data);
        }
      } catch (error) {
        console.error("캘린더 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    if (userInfo?.user_id) {
      fetchData();
    }
  }, [userInfo]);

  return (
    <div className="h-[100vh] flex-col pl-[18rem] pt-[5rem]">
      <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
        <Link to="/">
          <IoChevronBack className="text-[1.4rem]" />
        </Link>
        <p className="text-[1.4rem]">&nbsp; 공개 캘린더</p>
      </div>
      <div className="flex w-full">
        {/* <CaleanderSearch
          // openCalendars={openCalendars}
          toggleSubscription={toggleSubscription}
        /> */}
        <SubsciptionCaleander
          openCalendars={subscribedCalendars}
          toggleSubscription={toggleSubscription}
        />
      </div>
    </div>
  );
}

function CaleanderSearch({ openCalendars, toggleSubscription }) {
  //  input 검색창 상태 관리
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);
  const [debouncedInput, setDebouncedInput] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);

  // Debounce 로직
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
    <>
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
              key={calendar.id}
              className="my-2 flex w-[20rem] items-center gap-[1rem]"
            >
              <IoPersonCircleOutline className="h-[3.5rem] w-[3.5rem] object-cover" />
              <div>
                <h3 className="text-[#493282]">{calendar.calendarName}</h3>
                <p className="text-[#646464]">{calendar.userNickNam}</p>
              </div>
              <button
                className={`ml-auto h-[2rem] w-[5rem] rounded-[0.625rem] border-2 p-1 align-middle ${
                  calendar.isSubscribed
                    ? "border-[#E13228] bg-white text-[#E13228]"
                    : "border-[#E13228] bg-[#E13228] text-white"
                }`}
                onClick={() => toggleSubscription(calendar.id)}
              >
                {calendar.isSubscribed ? "구독취소" : "구독"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function SubsciptionCaleander({ openCalendars, toggleSubscription }) {
  return (
    <>
      <div className="relative after:absolute after:bottom-0 after:left-0 after:top-0 after:w-[2px] after:bg-gray-200 after:content-['']"></div>
      <section className="flex w-1/3 flex-col items-center">
        <h1>구독한 캘린더</h1>
        <ul className="flex w-auto flex-col">
          {openCalendars.map((calendar) => (
            <li key={calendar.id} className="my-2 flex items-center gap-[1rem]">
              <IoPersonCircleOutline className="h-[3.5rem] w-[3.5rem] object-cover" />
              <div>
                <h3 className="text-[#493282]">{calendar.calendar_name}</h3>
                <p className="text-[#646464]">
                  {calendar.calendar_description}
                </p>
              </div>
              <button
                className={`ml-auto h-[2rem] w-[5rem] rounded-[0.625rem] border-2 p-1 align-middle ${
                  calendar.isSubscribed
                    ? "border-[#E13228] bg-white text-[#E13228]"
                    : "border-[#E13228] bg-[#E13228] text-white"
                }`}
                onClick={() => toggleSubscription(calendar.id)}
              >
                {calendar.isSubscribed ? "구독취소" : "구독"}
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
