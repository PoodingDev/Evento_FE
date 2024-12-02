import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 뷰 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 상호작용 플러그인 (이벤트 클릭 등)
import CreateEvent from "components/CreateEventModal";
import EventInfoModal from "/src/components/EventInfoModal";
import "../styles/calendar.css";

// Calendar 컴포넌트
export default function Calendar() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태

  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };
  const [events, setEvents] = useState([]);

  // 날짜 클릭 핸들러
  const handleDateClick = (info) => {
    //   alert(`You clicked on date: ${info.dateStr}`); // 클릭된 날짜를 표시
    //   console.log('Clicked date:', info.dateStr);
    setSelectedDate(info.dateStr); // 클릭된 날짜 저장
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedDate(null); // 선택된 날짜 초기화
  };
  return (
    <>
      <div className="mainCalendar">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // 플러그인 추가
          initialView="dayGridMonth" // 기본 뷰 설정 (월 뷰)
          headerToolbar={{
            left: '',          // 왼쪽 버튼 제거
            center: 'title',   // 가운데에 제목 배치
            right: 'prev,today,next' // 오른쪽에 이전/다음 버튼 배치
          }}

          events={events} // 상태에서 가져온 이벤트
          aspectRatio={2.1}
          dateClick={handleDateClick} // 날짜 클릭 핸들러 등록
        />
      </div>
      {isModalOpen && (
        <EventInfoModal
          date={selectedDate}
          onClose={closeModal}
        />
      )}
      <div
        onClick={toggleCreateEvent}
        className="absolute bottom-[6rem] right-[6rem] flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple/70 text-center text-[4rem] text-eventoWhite  z-[100]"
      >
        +
      </div>

      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CreateEvent onClose={toggleCreateEvent} />
        </div>
      )}
    </>
  );
}
