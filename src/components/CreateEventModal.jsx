import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretDown, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CreateEvent({ onClose, setEvents }) {
  //캘린더 리스트 데이터
  const [calData, setCalData] = useState({
    calId: [],
    calendarName: [],
    calendarColor: [],
  });
  const [calColor, setCalColor] = useState("");

  //캘린더 리스트 보여주기
  const [showCalList, setShowCalList] = useState(false);
  const showList = () => setShowCalList(!showCalList);

  //캘린더 정보
  const [calInfo, setCalInfo] = useState({
    calenderId: "",
    calenderName: "",
    calendarColor: "",
    members: [],
  });

  //이벤트 제목(일정 이름)
  const [eventTitle, setEventTitle] = useState("");

  //캘린더 이름
  const [title, setTitle] = useState(`캘린더 이름`);

  //시간
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  //이벤트 상세
  const [detailEventMemo, setDetailEventMemo] = useState("");

  //공개여부
  const [isEventPublic, setIsEventPublic] = useState(true);
  const toggleIsPublic = () => setIsEventPublic(!isEventPublic);

  // 에러 메시지 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  //이벤트 생성 요청 핸들러
  const handleCreateEvent = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      if (!eventTitle) {
        throw new Error("일정 이름을 입력해주세요.");
      } else if (title === "캘린더 이름") {
        throw new Error("캘린더 이름을 선택해주세요.");
      }

      const response = await axios.post(
        "/api/calendars/:calendar_id/events",
        {
          event_title: eventTitle,
          cal_title: title,
          cal_color: calColor,
          start_time: startDate,
          end_time: endDate,
          event_description: detailEventMemo,
          is_public: isEventPublic,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        const start_date = new Date(response.data.start_time);
        const end_date = new Date(response.data.end_time);

        const formattedStartDate = start_date.toLocaleDateString("ko");
        const formattedEndDate = end_date.toLocaleDateString("ko");

        const newEvent = {
          allDay: true,
          id: response.data.event_id,
          title: response.data.event_title,
          start: start_date,
          end: end_date,
          extendedProps: {
            memo: response.data.event_description,
          },
          calTitle: title,
          color: calColor,
          editable: true, // 이벤트 편집 가능
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]); // 새로운 이벤트 추가

        console.log("Response Data:", JSON.stringify(response.data, null, 2));
        alert("이벤트가 성공적으로 생성되었습니다!");
        console.log(newEvent);
        onClose(); // 모달 닫기
      }
    } catch (error) {
      console.error("이벤트 생성 실패:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "이벤트를 생성하지 못했습니다. 다시 시도해 주세요.",
      );
    }
  };

  //캘린더 정보
  useEffect(() => {
    async function fetchCalInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get("/api/calendars/admins", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const calendarIds = response.data.map((item) => item.calendar_id);
        const calendarNames = response.data.map((item) => item.calendar_name);
        const calendarColors = response.data.map((item) => item.calendar_color);

        setCalData({
          calId: calendarIds,
          calendarName: calendarNames,
          calendarColor: calendarColors,
        });

        const { calendar_id, calendar_name, calendar_color, members } =
          response.data[0];

        setCalInfo({
          calenderId: calendar_id,
          calenderName: calendar_name,
          calendarColor: calendar_color,
          members: members,
        });
      } catch (error) {
        console.error("캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchCalInfo();
  }, []);

  useEffect(() => {
    // calData가 업데이트된 후 출력
    console.log(calData);
    console.log(calColor);
  }, [calData, calColor]);

  return (
    <div className="flex h-[29rem] w-[43rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="flex flex-col w-full">
        <div className="mb-[1rem] flex items-center justify-between">
          {/* 이벤트 제목 */}
          <input
            type="text"
            placeholder="일정 이름을 입력하세요"
            className="w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
            onChange={(e) => {
              setEventTitle(e.target.value);
            }}
          />
        </div>

        {/* 캘린더 선택 */}

        <div className="relative z-20 mb-[1.5rem] flex h-[2rem] w-[9rem] justify-center rounded-[2.5rem] bg-eventoPurpleLight text-center text-[1rem] font-bold">
          <div className="flex h-[1.55rem] -translate-x-[0.3rem] items-center justify-between">
            <FaCaretDown
              size={25}
              onClick={() => {
                showList();
              }}
            />
            <p className="">{`${title}`}</p>
          </div>
          {showCalList && (
            <div className="absolute left-[1.3rem] top-[1.55rem] flex h-[6rem] w-[8rem] flex-col overflow-auto">
              {calData.calId.map((cal) => {
                return (
                  <button
                    key={cal}
                    className="h-[1.5rem] w-[6.7rem] border-[0.1rem] border-solid border-darkGray bg-eventoPurpleLight leading-[1.5rem]"
                    onClick={() => {
                      setTitle(calData.calendarName[cal - 1]);
                      setCalColor(calData.calendarColor[cal - 1]);
                    }}
                  >
                    {calData.calendarName[cal - 1]}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 시간 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="relative z-10 mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
          <span className="w-[2rem] text-center">-</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setendDate(date)}
            dateFormat="yyyy-MM-dd"
            className="w-[12rem] bg-transparent text-center"
          />
        </div>

        {/* 일정 상세 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            일정 상세
          </div>
          <input
            type="text"
            placeholder="어떤 일정인가요?"
            className="border- w-[15rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
            onChange={(e) => {
              setDetailEventMemo(e.target.value);
            }}
          />
        </div>

        {/* 공개 여부 */}
        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            이벤트 공개 여부
          </div>
          <div className="flex items-center space-x-[0.5rem] text-[1rem] text-darkGray">
            <p>구독자들에게 공개하기</p>
            {isEventPublic ? (
              <FaToggleOn
                size={25}
                className="cursor-pointer text-eventoPurple"
                onClick={toggleIsPublic}
              />
            ) : (
              <FaToggleOff
                size={25}
                className="cursor-pointer text-eventoPurple"
                onClick={toggleIsPublic}
              />
            )}
          </div>
        </div>

        {/* 에러 메시지 출력 */}
        {errorMessage && (
          <div className="mt-4 text-darkRed">{errorMessage}</div>
        )}

        {/* 하단 버튼 */}
        <div className="absolute bottom-[2rem] right-[3rem] mt-[5rem] flex translate-x-[1rem] justify-end space-x-[0.5rem]">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
            onClick={onClose}
          >
            <span>취소</span>
          </button>
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50"
            onClick={handleCreateEvent}
          >
            <span>저장</span>
          </button>
        </div>
      </div>
    </div>
  );
}
