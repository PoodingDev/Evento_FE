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
  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };
  const [events, setEvents] = useState([]);

  // 데이터 불러오기 (예시: API 호출)
  useEffect(() => {
    setTimeout(() => {
      setEvents([
        { title: 'Event 1', start: '2024-12-01' },
        { title: 'Event 2', start: '2024-12-07', end: '2024-12-10', },
        {
          title: 'D-day: Event 1',
          start: '2024-12-01',
          allDay: true, // 하루 종일 이벤트로 설정
          description: 'This is a D-day event.',
          backgroundColor: '#FF5733', // D-day 강조를 위한 배경색
          textColor: 'white', // 텍스트 색상
          borderColor: '#C70039' // 테두리 색상
        }
      ]);
    }, 1000);
  }, []);

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
        />
      </div>

      <div
        onClick={toggleCreateEvent}
        className="absolute bottom-[6rem] right-[6rem] flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple/70 text-center text-[4rem] text-eventoWhite"
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
