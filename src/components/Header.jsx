import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Header({ isLogedIn, setLogedIn, userInfo }) {
  const navigate = useNavigate();
  const [isView, setIsView] = useState(false);

  const setView = () => {
    setIsView((prev) => !prev);
  };

  const handleLogout = () => {
    setLogedIn(false);
    navigate("/login");
  };

  return (
    <div className="evento-header absolute flex h-[5rem] w-full cursor-pointer items-center justify-between py-[1.25rem] pl-[2rem] pr-[2rem]">
      <img
        className="h-[2.5rem]"
        src="/assets/evento_logo.png"
        alt="Evento"
        onClick={() => navigate("/")}
      />
      {!isLogedIn ? (
        <button
          className="h-[2.5rem] w-[5rem] rounded-[0.5rem] bg-eventoPurple text-[0.95rem] font-semibold text-white hover:bg-eventoPurple/80 active:bg-eventoPurpleLight active:text-eventoPurple/80"
          onClick={() => navigate("/login")}
        >
          로그인
        </button>
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          className="text-2xl text-[#4F378B]"
          onClick={setView}
        />
      )}
      {isView && isLogedIn && (
        <div className="bg-event absolute right-[1rem] top-[4rem] flex h-[13em] w-[10rem] flex-col items-center justify-center rounded-[1rem] border-solid border-eventoPurpleLight bg-zinc-100 text-eventoblack">
          <FontAwesomeIcon
            icon={faUser}
            className="mb-[1rem] mt-[0.5rem] text-[1.5rem] text-[#4F378B]"
          />
          <p className="mb-[1.4rem] text-center text-[1.25rem] font-medium">
            {userInfo?.name || "Evento1"}
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
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
