import React from "react";

export default function Calendar() {
  return (
    <>
      <div className="flex h-[100vh] bg-eventoPurpleLight/50 text-center text-2xl">
        <div className="ml-[21rem] mt-[6rem] flex h-[calc(100vh-9rem)] w-[calc(100vw-24rem)] items-center justify-center rounded-sm bg-eventoWhite">
          <span className="">Calendar 개발 중</span>
        </div>
        <div className="absolute bottom-[6rem] right-[6rem] flex h-[8rem] w-[8rem] items-center justify-center rounded-full bg-eventoPurple/70 text-center text-[4rem] text-eventoWhite">
          +
        </div>
      </div>
    </>
  );
}
