import CreateEvent from "components/CreateEventModal";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'; // 월 뷰 플러그인
import timeGridPlugin from '@fullcalendar/timegrid'; // 주/일 뷰 플러그인
import interactionPlugin from '@fullcalendar/interaction'; // 상호작용 플러그인 (이벤트 클릭 등)

export default function Calendar() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-[100vh] bg-eventoWhite text-center text-2xl">
        {/* 부모 div의 높이를 calc()로 설정하여 100vh에서 다른 요소들의 높이를 제외 */}
        <div className="ml-[21rem] mt-[4rem] h-[calc(100vh-9rem)] w-[calc(100vw-24rem)] items-center justify-center rounded-sm bg-eventoWhite">
          <MainCalendar className="h-[calc(100vh-9rem)]" />
        </div>
        <div
          onClick={toggleCreateEvent}
          className="absolute bottom-[6rem] right-[6rem] flex h-[8rem] w-[8rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple/70 text-center text-[4rem] text-eventoWhite"
        >
          +
        </div>
      </div>
      {isCreateEventOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <CreateEvent onClose={toggleCreateEvent} />
        </div>
      )}
    </>
  );
}

// MainCalendar 컴포넌트
function MainCalendar() {
  const [events, setEvents] = useState([]);

  // 데이터 불러오기 (예시: API 호출)
  useEffect(() => {
    setTimeout(() => {
      setEvents([
        { title: 'Event 1', start: '2024-12-01' },
        { title: 'Event 2', start: '2024-12-07', end: '2024-12-10' },
      ]);
    }, 1000);
  }, []);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]} // 플러그인 추가
        initialView="dayGridMonth" // 기본 뷰 설정 (월 뷰)
        headerToolbar={{
          center: 'title', // 중앙: 제목
          // left: 'prev,next today', // 왼쪽: 이전, 다음, 오늘          
          // right: 'dayGridMonth,timeGridWeek,timeGridDay', // 오른쪽: 월, 주, 일 뷰 버튼
        }}
        events={events} // 상태에서 가져온 이벤트
        aspectRatio={2.1}
      // dayMaxRowCount={5} // 최대 5줄까지만 표시
      />
    </>
  );
}