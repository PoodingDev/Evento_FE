import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="evento-header bg-eventoWhite/20 absolute flex h-[5rem] w-full items-center justify-between py-[1.25rem] pl-[1.5rem] pr-[2rem]">
      <img src="/src/assets/logo/event_logo.png" alt="Evento" />

      {/* 작업할 때 아래 주석 처리 뜯고 하시면 편합니다 */}

      <Link to="/profile">profile</Link>
      <Link to="/profile/edit">edit profile</Link>
      <Link to="/event">event</Link>
      <Link to="/new-event">create event</Link>
      <Link to="/login">login</Link>
      <Link to="/"></Link>

      <FontAwesomeIcon icon={faUser} className="text-2xl text-[#4F378B]" />
    </div>
  );
}
