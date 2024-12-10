import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../api/axios";
import { useCalendar } from "../context/CalendarContext";

import {
  IoChevronBack,
  IoPersonCircleOutline,
  IoSearch,
} from "react-icons/io5";

export default function Subscription() {
  const { subscribedCalendars, fetchData } = useCalendar();
  const [filteredSearch, setFilteredSearch] = useState([]);

  const toggleSearchSubscription = async (calendar) => {
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
      } else {
        // 구독 추가
        await instance.post(
          `/api/calendars/subscriptions/`,
          { calendar_id: id },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        setFilteredSearch((prev) =>
          prev.map((item) =>
            item.calendar_id === id ? { ...item, is_subscribed: true } : item,
          ),
        );
      }

      // 데이터 동기화
      fetchData();
    } catch (error) {
      console.error("구독 상태 변경 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    async function fetchSearchResults() {
      const token = localStorage.getItem("token");
      const response = await instance.get(`/api/calendars/search/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setFilteredSearch(response.data);
      } else {
        console.error("캘린더 검색 데이터를 가져오지 못했습니다.");
      }
    }

    fetchSearchResults();
  }, []);

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
          toggleSubscription={toggleSearchSubscription}
        />

        <SubscriptionCalender
          openCalendars={subscribedCalendars}
          toggleSubscription={toggleSearchSubscription}
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
          setFilteredSearch(response.data);
        } else {
          setFilteredSearch([]);
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
          placeholder="캘린더를 검색하세요"
          onChange={(event) => setInputValue(event.target.value)}
          className="focus: rounded-full bg-gray-200 p-[2px] px-3 py-2 text-center text-eventoblack/90 focus:bg-eventoPurpleLight/80 focus:placeholder-eventoPurpleDark/50 focus:outline-none"
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
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
