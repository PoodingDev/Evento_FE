import React from "react";
import { FaBirthdayCake, FaPen } from "react-icons/fa";
import { IoChevronBack, IoPersonCircleOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const editClick = () =>
    navigate("profile/edit", {
      state: { userName, userNickname, userEmail, userBirth },
    });
  const userName = `이지금`;
  const userNickname = `dlwlrma`;
  const userEmail = `dlalrma@pooding.com`;
  const userBirth = `2024-11-11`;

  return (
    <>
      <div className="bg-eventoWhite h-[100vh] pl-[18rem] pt-[5rem]">
        <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
          <Link to="/">
            <IoChevronBack className="text-[1.4rem]" />
          </Link>
          <p className="text-[1.4rem]">&nbsp; 내 프로필</p>
        </div>
        <div className="flex h-full -translate-y-[6rem] items-center justify-center">
          <div className="flex h-[30rem] w-[30rem] flex-col items-center justify-center">
            <IoPersonCircleOutline className="text-eventoPurpleBase h-[8rem] w-[8rem]" />
            <ul className="mt-[0.5rem] space-y-[0.8rem] text-[1.2rem]">
              <li className="text-center">{userNickname}</li>
              <li className="text-center">{userName}</li>
              <li className="text-darkGray text-center text-[1.1rem]">
                {userEmail}
              </li>
              <li className="flex items-center justify-center gap-1 text-center">
                <FaBirthdayCake className="text-[1.2rem]" />
                <span>{userBirth}</span>
              </li>
            </ul>
          </div>
          <FaPen
            className="text-darkGray -translate-x-[9rem] -translate-y-[3.5rem] cursor-pointer text-[1rem]"
            onClick={editClick}
          />
        </div>
        <div className="absolute bottom-[3rem] right-[4rem]">
          <button className="text-darkGray border-darkGray w-[7rem] gap-3 rounded-[0.625rem] border-2 bg-white px-3 py-2">
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  );
}
