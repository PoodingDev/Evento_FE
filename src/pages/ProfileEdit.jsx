import React, { useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { IoCalendarOutline, IoPersonCircleOutline } from "react-icons/io5";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

//  닉네임 수정 상태값 및 생일공개 토글 상태값 저장 취소버튼 클릭 시 main page이동
export default function ProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, userNickname, userEmail, userBirth } = location.state || {};

  // 닉네임 수정 상태
  const [newNickName, setNewNickName] = useState(userNickname);
  const [saveNickName, setSaveNickName] = useState("");

  // 토글 상태
  const [isToggled, setIsToggled] = useState(true);
  const [saveToggleState, setSaveToggleState] = useState(false);

  // 닉네임 수정 핸들러
  const handleNickName = (e) => {
    setNewNickName(e.target.value);
  };

  // 닉네임 저장 핸들러
  const handleSaveNickName = () => {
    setSaveNickName(newNickName);
  };

  // 토글 상태 변경 핸들러
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    // 저장할 때 닉네임과 토글 상태 저장
    handleSaveNickName(); // 닉네임 저장
    setSaveToggleState(isToggled); // 토글 상태 저장
    // 이후 저장 로직 (예: 서버에 저장, 로컬스토리지 저장 등)
    alert("변경된 닉네임과 공개 상태가 저장되었습니다!")
    navigate(-1); // 이전 페이지로 이동
  };

  // 취소 버튼 클릭 시 서버와 통신 없이 바로 이전 페이지로 이동
  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <>
      <div className="h-[100vh] bg-eventoWhite pl-[18rem] pt-[4rem]">
        <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
          <p className="text-[1.4rem]">&nbsp; 내 프로필 수정</p>
        </div>
        <div className="flex h-full -translate-x-[2rem] -translate-y-[6rem] flex-col items-center justify-center">
          <div className="h-[15rem] w-[40rem]">
            <div className="flex items-center justify-center space-x-[6rem]">
              <div className="flex flex-col items-center gap-3">
                <IoPersonCircleOutline className="h-[7.5rem] w-[7.5rem] object-cover text-eventoPurpleBase" />
                <input
                  type="text"
                  value={newNickName}
                  onChange={handleNickName}
                  placeholder="닉네임 수정"
                  className="focus: w-[9rem] rounded-lg bg-gray-200 p-[2px] px-3 py-2 text-center focus:border-[1px] focus:border-eventoPurple/80 focus:bg-eventoPurpleLight/80 focus:outline-none"
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
                  <span onClick={handleToggle}>
                    {isToggled ? (
                      <FaToggleOn className="text-[1.3rem] text-eventoPurpleBase" />
                    ) : (
                      <FaToggleOff className="text-[1.3rem] text-eventoPurpleBase" />
                    )}
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-[5rem] flex justify-center space-x-[1rem]">
              <button
                onClick={handleCancel}
                className="w-[7rem] gap-3 rounded-[0.625rem] border-2 border-eventoPurpleBase bg-white px-3 py-2 text-eventoPurpleBase"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="w-[7rem] gap-3 rounded-[0.625rem] bg-eventoPurpleBase px-3 py-2 text-white"
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
