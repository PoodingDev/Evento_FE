import CreateEvent from "components/CreateEventModal";
import React, { useState } from "react";

export default function Calendar() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const toggleCreateEvent = () => {
    setIsCreateEventOpen((prev) => !prev);
  };
  return (
    <>
      <div className="flex h-[100vh] bg-eventoPurpleLight/50 text-center text-2xl">
        <div className="ml-[21rem] mt-[6rem] flex h-[calc(100vh-9rem)] w-[calc(100vw-24rem)] items-center justify-center rounded-sm bg-eventoWhite">
          <span className="">Calendar 개발 중</span>
        </div>
        <div
          onClick={toggleCreateEvent}
          className="absolute bottom-[6rem] right-[6rem] flex h-[6rem] w-[6rem] cursor-pointer items-center justify-center rounded-full bg-eventoPurple/70 text-center text-[4rem] text-eventoWhite"
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
