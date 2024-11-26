import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="evento-header absolute flex h-[5rem] w-full items-center justify-between bg-eventoWhite/20 py-[1.25rem] pl-[1.5rem] pr-[2rem]">
      <img src="/assets/logo/event_logo.png" alt="Evento" />

      {/* 작업할 때 아래 주석 처리 뜯고 하시면 편합니다 */}
      {/* 
      <Link to="/profile">Profile</Link>
      <Link to="/event">Event</Link>
      <Link to="/new-event">Create Event</Link>
      <Link to="/login">Login</Link>
      <Link to="/"></Link> */}

      <FontAwesomeIcon icon={faUser} className="text-2xl text-[#4F378B]" />
    </div>
  );
}
