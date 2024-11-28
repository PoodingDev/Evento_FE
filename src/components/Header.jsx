import EventInfo from "./EventInfoModal";
import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isView, setIsView] = useState(false);
  const setView = () => {
    setIsView(!isView);
  };

  // 이벤트 수정 임시 링크 - 캘린더 수정 완료 후 복붙
  const [isEventInfoOpen, setIsEventInfoOpen] = useState(false);
  const toggleEventInfo = () => {
    setIsEventInfoOpen((prev) => !prev);
  };

  return (
    <div className="evento-header absolute flex h-[5rem] w-full cursor-pointer items-center justify-between py-[1.25rem] pl-[2rem] pr-[2rem]">
      <img
        className="h-[2.5rem]"
        src="/assets/evento_logo.png"
        alt="Evento"
        onClick={() => navigate("/")}
      />
      {/* 작업할 때 아래 주석 처리 뜯고 하시면 편합니다 */}
      {/* <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/"></Link>
      <Link to="/code">code</Link> */}
      <div onClick={toggleEventInfo}>이벤트 수정(임시링크)</div>
      <FontAwesomeIcon
        icon={faUser}
        className="text-2xl text-[#4F378B]"
        onClick={setView}
      />
      {/* {isView && <Dropdown isView={isView} />} */}
      {isView && (
        <div className="absolute right-[0rem] top-[5rem] flex h-[21.2rem] w-[15.5rem] flex-col items-center justify-center rounded-[1.25rem] bg-eventoWhite">
          <FontAwesomeIcon
            icon={faUser}
            className="mb-[1.3rem] mt-[0.5rem] text-[3rem] text-[#4F378B]"
          />
          <p className="mb-[3rem] text-[1.25rem] font-medium">
            안녕하세요, dlwlrma님.
          </p>
          <button
            className="mb-[1.25rem] h-[2.5rem] w-[10rem] rounded-[3rem] border-[0.1rem] border-solid border-black text-[1.25rem] font-bold"
            onClick={() => {
              setView();
              navigate("/profile");
            }}
          >
            내 프로필 보기
          </button>
          <button className="h-[2.5rem] w-[10rem] rounded-[3rem] border-[0.1rem] border-solid border-darkRed text-[1.25rem] font-bold text-darkRed">
            로그아웃
          </button>
        </div>
      )}

      {/* 이벤트 수정 임시 링크 - 캘린더 수정 완료 후 복붙*/}
      {isEventInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <EventInfo onClose={toggleEventInfo} />
        </div>
      )}
    </div>
  );
}
