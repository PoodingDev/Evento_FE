import "../styles/calendar.css";
import CreateEvent from "components/CreateEventModal";
import EventInfoModal from "/src/components/EventInfoModal";
import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaPlus } from "react-icons/fa6";

export default function Calendar() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [events, setEvents] = useState([]); // 이벤트 상태s
  const [selectedEvent, setSelectedEvent] = useState(null); // 클릭된 이벤트 상태 관리

  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };
  const [calTitle, setCalTitle] = useState("");
  const [calColor, setcalColor] = useState("");

  // 클릭된 이벤트를 처리하는 함수
  const handleEventClick = (info) => {
    const clickedEvent = info.event;

    const findEvent = () => {
      const event = events.find((event) => event.title === clickedEvent.title);
      if (event) {
        setCalTitle(event.calTitle);
        setcalColor(event.color);
      } else {
      }
    };

    const eventDetails = {
      title: clickedEvent.title,
      start: clickedEvent.start,
      end: clickedEvent.end,
      description: clickedEvent.extendedProps.memo,
      groupId: clickedEvent.groupId,
      cal_title: calTitle,
      color: calColor,
    };
    findEvent();

    setSelectedEvent(eventDetails); // 클릭된 이벤트 정보 상태로 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedEvent(null); // 선택된 날짜 초기화
  };

  return (
    <>
      <div className="mainCalendar bg-eventoWhite">
        <FullCalendar
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
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <EventInfoModal
            eventDetails={selectedEvent}
            event={events}
            onClose={closeModal}
          />
        </div>
      )}

      <div
        onClick={toggleCreateEvent}
        className="absolute bottom-[5rem] right-[5rem] z-[100] flex h-[6rem] w-[6rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple/60 text-center text-[4rem] text-eventoWhite hover:bg-eventoPurple"
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
