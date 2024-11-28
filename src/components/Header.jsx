import EventInfo from "./EventInfoModal";
import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isView, setIsView] = useState(false);
  const setView = () => {
    setIsView((prev) => !prev);
  };

  // 이벤트 수정 임시 링크 - 캘린더 수정 완료 후 복붙
  const [isEventInfoOpen, setIsEventInfoOpen] = useState(false);
  const toggleEventInfo = () => {
    setIsEventInfoOpen((prev) => !prev);
  };
  const [isLogedIn, setLogedIn] = useState(false);

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
        <div className="bg-event absolute right-[1rem] top-[4rem] flex h-[13em] w-[10rem] flex-col items-center justify-center rounded-[1rem] border-solid border-eventoPurpleLight bg-zinc-100 text-eventoblack">
          <FontAwesomeIcon
            icon={faUser}
            className="mb-[1rem] mt-[0.5rem] text-[1.5rem] text-[#4F378B]"
          />
          <p className="mb-[1.4rem] text-center text-[1.25rem] font-medium">
            dlwlrma
          </p>
          <button
            className="mb-[0.3rem] h-[2rem] w-[7rem] rounded-[0.5rem] text-[0.95rem] font-semibold hover:bg-eventoPurpleLight hover:text-eventoPurple"
            onClick={() => {
              setView();
              navigate("/profile");
            }}
          >
            내 프로필
          </button>
          <button
            className="h-[2rem] w-[7rem] rounded-[0.5rem] text-[0.95rem] font-semibold hover:bg-lightRed hover:text-darkRed"
            onClick={() => {
              setView();
              navigate("/login");
            }}
          >
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
