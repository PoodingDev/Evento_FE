import "../styles/calendar.css";
import CreateEvent from "components/CreateEventModal";
import EventInfo from "components/EventInfo";
import EventInfoModal from "/src/components/EventInfoModal";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { FaPlus } from "react-icons/fa6";
import { instance } from "../api/axios";

export default function Calendar() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [events, setEvents] = useState([]); // 이벤트 상태s
  const [selectedEvent, setSelectedEvent] = useState(null); // 클릭된 이벤트 상태 관리
  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };
  const [sidebarUpdate, setSidebarUpdate] = useState(false); // 사이트바 체크박스 변화

  // 클릭된 이벤트를 처리하는 함수
  const handleEventClick = (info) => {
    const clickedEvent = info.event;
    console.log("qwer");
    console.log(clickedEvent);
    const eventDetails = {
      id: clickedEvent.id,
      title: clickedEvent.title,
      start: clickedEvent.start,
      end: clickedEvent.end,
      description: clickedEvent.extendedProps.memo,
      groupId: clickedEvent.groupId,
      cal_id: clickedEvent.extendedProps.calId,
      cal_title: clickedEvent.extendedProps.calTitle,
      color: clickedEvent.backgroundColor,
      isPublic: clickedEvent.extendedProps.isPublic,
    };

    setSelectedEvent(eventDetails); // 클릭된 이벤트 정보 상태로 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedEvent(null); // 선택된 날짜 초기화
  };

  //캘린더 정보 가져오기
  const [calInfo, setCalInfo] = useState([]);
  useEffect(() => {
    async function fetchCalInfoChange() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await instance.get("/api/calendars/admin/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const info = response.data.map((cal) => ({
          calId: cal.calendar_id,
          calendarName: cal.name,
          calendarColor: cal.color,
          isactive: cal.isactive,
        }));
        setCalInfo((prevCalInfo) => [
          ...prevCalInfo, // 기존의 calInfo 데이터
          ...info, // 새로 가져온 구독 캘린더 데이터
        ]);
      } catch (error) {
        console.error("캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchCalInfoChange();
  }, []);

  //구독 캘린더 정보 가져오기
  useEffect(() => {
    async function fetchCalInfoSubChange() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await instance.get("/api/calendars/subscriptions/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const info = response.data.map((cal) => ({
          calId: cal.id,
          calendarName: cal.name,
          calendarColor: cal.color,
          isactive: cal.isactive,
        }));
        setCalInfo((prevCalInfo) => [
          ...info, // 새로 가져온 구독 캘린더 데이터
        ]);
      } catch (error) {
        console.error("구독 캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchCalInfoSubChange();
  }, []);

  //이벤트 정보 가져오기
  useEffect(() => {
    async function fetchEventInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기

        //isactive인 캘린더의 이벤트(바뀐 API)
        const response = await instance.get(`/api/events/public/list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const start_date = new Date(response.data.start_time);
        // const end_date = new Date(response.data.end_time);

        // const formattedStartDate = start_date.toLocaleDateString("ko");
        // const formattedEndDate = end_date.toLocaleDateString("ko");
        const eventMockData = response.data.map((event) => {
          const calendar = calInfo.find(
            (cal) => cal.calId === event.calendar_id,
          );

          return {
            displayEventEnd: true,
            allDay: false,
            id: event.event_id,
            title: event.title,
            start: event.start_time,
            end: event.end_time,
            extendedProps: {
              memo: event.description,
            },
            calId: event.calendar_id,
            calTitle: calendar ? calendar.calendarName : "", // calId와 일치하는 calendarName을 설정
            color: calendar ? calendar.calendarColor : "gray", // 기본 색상 지정
            editable: true, // 이벤트 편집 가능
          };
        });
        setEvents(eventMockData);
      } catch (error) {
        console.error("이벤트 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchEventInfo();
  }, [calInfo, isModalOpen, isCreateEventOpen]);

  return (
    <>
      <div className="mainCalendar scrollbar-custom overflow-scroll bg-eventoWhite">
        <FullCalendar
          // plugins={[dayGridPlugin, interactionPlugin]} // 플러그인 추가
          className="h-auto overflow-auto"
          plugins={[dayGridPlugin, timeGridPlugin]} // 플러그인 추가
          initialView="dayGridMonth" // 기본 뷰 설정
          headerToolbar={{
            left: "", // 왼쪽 버튼 제거
            center: "title", // 가운데에 제목 배치
            right: "prev,today,next", // 오른쪽에 이전/다음 버튼 배치
          }}
          buttonText={{
            today: "TODAY", // 'today' 버튼 텍스트를 대문자로
          }}
          events={events} // 이벤트 추가
          aspectRatio={2}
          eventClick={handleEventClick} // 이벤트 클릭 핸들러
          dayMaxEventRows={4}
          dayCellDidMount={(info) => {
            // 특정 날짜 칸에 커스텀 스타일 적용ㄴ
            info.el.style.height = "6rem";
            // info.el.style.overflow="scroll";
          }}
        />
      </div>

      {/* <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 플러그인 추가
        initialView="dayGridMonth" // 기본 뷰 설정
        headerToolbar={{
          left: "", // 왼쪽 버튼 제거
          center: "title", // 가운데에 제목 배치
          right: "prev,today,next", // 오른쪽에 이전/다음 버튼 배치
        }}
        buttonText={{
          today: "TODAY", // 'today' 버튼 텍스트를 대문자로
        }}
        events={events} // 이벤트 추가
        aspectRatio={2.1}
        eventClick={handleEventClick} // 이벤트 클릭 핸들러
        dayMaxEventRows={3} // 날짜별 최대 표시할 이벤트 수
        moreLinkClick="popover"
        dayCellDidMount={(info) => {
          // 특정 날짜 칸에 커스텀 스타일 적용
          info.el.style.height = "10rem";
          // info.el.style.overflow = "hidden";
        }}
      /> */}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <EventInfo
            eventDetails={selectedEvent}
            events={events}
            onClose={closeModal}
            setEvents={setEvents}
          />
        </div>
      )}

      <div
        onClick={toggleCreateEvent}
        className="absolute bottom-[5rem] right-[5rem] z-[100] flex h-[6rem] w-[6rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple text-center text-[4rem] text-eventoWhite hover:bg-eventoPurple"
      >
        <FaPlus className="text-[3rem]" />
      </div>

      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CreateEvent onClose={toggleCreateEvent} setEvents={setEvents} />
        </div>
      )}
    </>
  );
}
