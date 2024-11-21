import React from 'react'
import { FaPen, FaBirthdayCake } from 'react-icons/fa'
import { IoPersonCircleOutline, IoChevronBack } from "react-icons/io5"
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate();
  const editClick = () => navigate("/profile-edit", { state: { userName, userNickname, userEmail, userBirth } });
  const userName = `이지금`
  const userNickname = `dlwlrma`
  const userEmail = `dlalrma@pooding.com`
  const userBirth = `2024-11-11`

  return (
    <>
      <div className="pl-[18rem] flex flex-col gap-[8rem] items-center justify-center h-screen">
        <div className="flex gap-4 self-start items-center">
          <Link to="/">
            <IoChevronBack className="text-[1.2rem]" />
          </Link>
          <p>내 프로필</p>
        </div>
        <ul className="flex flex-col gap-1 items-center">
          <li className="flex items-center justify-center">
            <IoPersonCircleOutline className="text-[#4F378B] w-[7.5rem] h-[7.5rem] object-cover" />
            <FaPen className="self-end text-[1rem] text-[#646464]" onClick={editClick} />
          </li>
          <li className="text-center">{userNickname}</li>
          <li className="text-center">{userName}</li>
          <li className="text-center">{userEmail}</li>
          <li className="flex justify-center gap-1 items-center text-center">
            <FaBirthdayCake className="text-[1rem]" />
            <span>{userBirth}</span>
          </li>
        </ul>

        {/* 회원탈퇴 버튼 */}
        <div className="absolute bottom-10 right-10">
          <button className="w-[7rem] gap-3 rounded-[0.625rem] py-2 px-3 bg-white text-[#E13228] border-2 border-[#E13228]">
            회원탈퇴
          </button>
        </div>
      </div>
    </>
  )
}

