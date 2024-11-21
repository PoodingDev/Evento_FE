import React, { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { IoCalendarOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export default function ProfileEdit() {
  const location = useLocation();
  const { userName, userNickname, userEmail, userBirth } = location.state || {};
  const [newNickName, setNewNickName] = useState(userNickname);
  const [saveNickName, setSaveNickName] = useState("");
  const handleNickName = (e) => {
    setNewNickName(e.target.value);
  };
  const handleSave = () => {
    setSaveNickName(newNickName);
  };
  return (
    <>
      <div className="bg-eventoWhite h-[100vh] pl-[18rem] pt-[5rem]">
        <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
          <p className="text-[1.4rem]">&nbsp; 내 프로필 수정</p>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="h-[15rem] w-[40rem] -translate-x-[2rem] -translate-y-[0.5rem]">
            <div className="flex -translate-y-[6rem] items-center justify-center space-x-[6rem]">
              <div className="flex flex-col items-center gap-3">
                <IoPersonCircleOutline className="text-eventoPurpleBase h-[7.5rem] w-[7.5rem] object-cover" />
                <input
                  type="text"
                  value={newNickName}
                  onChange={handleNickName}
                  className="focus:border-eventoPurple/80 focus:bg-eventoPurpleLight/80 focus: w-[9rem] rounded-lg bg-gray-200 p-[2px] px-3 py-2 text-center focus:border-[1px] focus:outline-none"
                  placeholder="닉네임 수정"
                />
              </div>

              <ul className="flex w-[20rem] flex-col space-y-[1.5rem] p-[2px]">
                <li className="flex items-center justify-between">
                  <span className="text-darkGray">이름</span>
                  <span className="text-eventoblack">{userName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-darkGray">이메일</span>
                  <span className="text-eventoblack">{userEmail}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-darkGray">내 생일</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-eventoblack">{userBirth}</span>
                    <IoCalendarOutline className="text-eventoPurpleDark" />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-darkGray">공개</span>
                  <span>
                    <FaToggleOn className="text-eventoPurpleBase text-[1.3rem]" />
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center space-x-[1rem]">
              <button className="border-eventoPurpleBase text-eventoPurpleBase w-[7rem] gap-3 rounded-[0.625rem] border-2 bg-white px-3 py-2">
                취소
              </button>
              <button
                onClick={handleSave}
                className="bg-eventoPurpleBase w-[7rem] gap-3 rounded-[0.625rem] px-3 py-2 text-white"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
