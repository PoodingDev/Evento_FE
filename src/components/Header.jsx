import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="evento-header bg-eventoWhite absolute flex h-[5rem] w-full items-center justify-between py-[1.25rem] pl-[1.5rem] pr-[2rem]">
      <img src="/src/assets/logo/event_logo.png" alt="Evento" />
      <FontAwesomeIcon icon={faUser} className="text-2xl text-[#4F378B]" />
    </div>
  );
}
