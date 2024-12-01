import React, { useState, useEffect } from 'react'
import { IoChevronBack, IoPersonCircleOutline, IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'

export default function Subscription() {
  //더미데이터
  const [openCalendars, setOpenCalendars] = useState([
    { id: "100", calendarName: "therock", userNickNam: "Dwayne Johnson" },
    { id: "101", calendarName: "bts.bighitofficial", userNickNam: "BTS" },
    { id: "102", calendarName: "IU", userNickNam: "dlwlrma" },
    { id: "103", calendarName: "xxxibgdrgn", userNickNam: "G-DRAGON" },
    { id: "104", calendarName: "songkang_b", userNickNam: "송강" },
    { id: "105", calendarName: "캘린더이름", userNickNam: "생성자닉네임" },
  ]);

  // 클릭 시 구독 상태 반전
  const toggleSubscription = (id) => {
    setOpenCalendars((prevCalendars) =>
      prevCalendars.map((calendar) =>
        calendar.id === id
          ? { ...calendar, isSubscribed: !calendar.isSubscribed } // 구독 상태 반전
          : calendar,
      ),
    );
  };

  useEffect(() => {
    openCalendars.forEach((calendar) => {
      if (calendar.isSubscribed) {
        console.log(calendar.calendarName); // 구독 상태가 true일 때만 출력
      }
    });
  }, [openCalendars]);

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
          openCalendars={openCalendars}
          toggleSubscription={toggleSubscription}
        />
        <SubsciptionCaleander
          openCalendars={openCalendars}
          toggleSubscription={toggleSubscription}
        />
      </div>
    </div>
  );
}

function CaleanderSearch({ openCalendars, toggleSubscription }) {
  //  input 검색창 상태 관리
  const [inputValue, setInputValue] = useState('')
  console.log(inputValue)
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
      const newFilteredSearch = openCalendars.filter((calendar) =>
        calendar.userNickNam.toLowerCase().includes(inputValue.toLowerCase()) ||
        calendar.calendarName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSearch(newFilteredSearch); // 상태 업데이트
    }
  }, [debouncedInput, openCalendars]);

  return (
    <>
      <section className='flex justify-center align-middle  items-center w-2/3 flex-col py-[3rem]'>
        <div className='flex items-center gap-2'>
          <input
            type="text"
            value={inputValue}
            placeholder="닉네임을 검색하세요"
            onChange={(event) => setInputValue(event.target.value)}
            className=' focus:border-eventoPurple/80 focus:bg-eventoPurpleLight/80 focus: rounded-2xl bg-gray-200 p-[2px] px-3 py-2 text-center focus:border-[1px] focus:outline-none' />
          <IoSearch className='text-[2rem]' />
        </div>
        <ul className='w-auto flex flex-col my-[2rem]'>

          {filteredSearch.map((calendar) => (
            <li key={calendar.id}
              className="flex items-center gap-[1rem] w-[20rem] my-2 ">
              <IoPersonCircleOutline className="w-[3.5rem] h-[3.5rem] object-cover" />
              <div >
                <h3 className='text-[#493282]'>{calendar.calendarName}</h3>
                <p className='text-[#646464]'>{calendar.userNickNam}</p>

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

      <div className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:w-[2px] after:bg-gray-200">
      </div>
      <section className='  flex items-center w-1/3 flex-col '>

        <h1>구독한 캘린더</h1>
        <ul className="flex w-auto flex-col">
          {openCalendars
            .filter((calendar) => calendar.isSubscribed)
            .map((calendar) => (
              <li
                key={calendar.id}
                className="my-2 flex items-center gap-[1rem]"
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
