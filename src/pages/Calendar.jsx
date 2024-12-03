import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월 뷰 플러그인
import interactionPlugin from "@fullcalendar/interaction"; // 상호작용 플러그인 (이벤트 클릭 등)
import CreateEvent from "components/CreateEventModal";
import EventInfoModal from "/src/components/EventInfoModal";
import "../styles/calendar.css";

export default function Calendar() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [events, setEvents] = useState([]); // 이벤트 상태s
  const [selectedEvent, setSelectedEvent] = useState(null);  // 클릭된 이벤트 상태 관리

  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };

  // 클릭된 이벤트를 처리하는 함수
  const handleEventClick = (info) => {
    const clickedEvent = info.event;
    const eventDetails = {
      title: clickedEvent.title,
      start: clickedEvent.start,
      end: clickedEvent.end,
      description: clickedEvent.extendedProps.memo,
      groupId: clickedEvent.groupId,
    };

    setSelectedEvent(eventDetails);  // 클릭된 이벤트 정보 상태로 저장
    setIsModalOpen(true);  // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedEvent(null); // 선택된 날짜 초기화
  };

  return (
    <>
      <div className="mainCalendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // 플러그인 추가
          initialView="dayGridMonth" // 기본 뷰 설정 (월 뷰)
          headerToolbar={{
            left: "", // 왼쪽 버튼 제거
            center: "title", // 가운데에 제목 배치
            right: "prev,today,next", // 오른쪽에 이전/다음 버튼 배치
          }}
          events={events} // 상태에서 가져온 이벤트
          aspectRatio={2.1}
          eventClick={handleEventClick}  // 클릭한 이벤트 처리
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <EventInfoModal
            eventDetails={selectedEvent}
            onClose={closeModal}
          />
        </div>
      )}

      <div
        onClick={toggleCreateEvent}
        className="absolute bottom-[6rem] right-[6rem] flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple/70 text-center text-[4rem] text-eventoWhite z-[100]"
      >
        +
      </div>

      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CreateEvent onClose={toggleCreateEvent} setEvents={setEvents} />
        </div>
      )}
    </>
  );
}
