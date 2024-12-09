import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { FaCalendar, FaRegCalendar } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../api/axios";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userName, userNickname, userEmail, userBirth } = location.state || {};

  const [nickname, setNickname] = useState(userNickname);
  const [birth, setBirth] = useState(userBirth ? new Date(userBirth) : null);
  const [isToggled, setIsToggled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNickName = (e) => {
    setUserNickname(e.target.value);
  };

  // const handleToggle = () => {
  //   setIsToggled(!isToggled);
  // };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await instance.put(
        `/api/users/me/`,
        {
          user_email: userEmail,
          user_name: userName,
          user_birth: birth ? birth.toISOString().substring(0, 10) : null,
          user_nickname: nickname,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert("변경된 정보가 저장되었습니다!");
        navigate(-1);
      }
    } catch (error) {
      console.error("사용자 정보 수정 실패:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          setErrorMessage("로그인이 필요합니다.");
        } else if (status === 404) {
          setErrorMessage("사용자 정보를 찾을 수 없습니다.");
        } else if (status === 400) {
          if (data.error === "닉네임 중복") {
            setErrorMessage("이미 사용 중인 닉네임입니다.");
          } else {
            setErrorMessage("닉네임과 생일 정보가 필요합니다.");
          }
        } else {
          setErrorMessage("사용자 정보를 수정하지 못했습니다.");
        }
      } else {
        setErrorMessage(
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해 주세요.",
        );
      }
    }
    localStorage.setItem("user_nickname", nickname);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
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
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 수정"
                className="w-[9rem] rounded-lg bg-gray-200 p-[2px] px-3 py-2 text-center font-semibold text-darkGray focus:border-[1px] focus:border-none focus:bg-eventoPurpleLight/80 focus:outline-none"
              />
            </div>

            <ul className="flex w-[20rem] flex-col space-y-[1.5rem] p-[2px]">
              <li className="flex items-center justify-between">
                <span className="font-semibold text-darkGray">이름</span>
                <span className="text-darkGray">{userName}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold text-darkGray">이메일</span>
                <span className="text-darkGray">{userEmail}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-semibold text-darkGray">생일</span>
                <div className="flex items-center justify-end rounded-lg bg-gray-200">
                  <DatePicker
                    selected={birth}
                    onChange={(date) => setBirth(date)}
                    dateFormat="yyyy-MM-dd"
                    className="w-[6rem] rounded-lg bg-gray-200 p-1 text-right text-darkGray"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                    minDate={new Date(1900, 0, 1)}
                    maxDate={new Date(2050, 11, 31)}
                  />
                  <FaRegCalendar className="rounded-lgtext-center mx-[0.2rem] text-[1.1rem] text-eventoPurpleBase/80" />
                </div>
              </li>
            </ul>
          </div>

          <div className="inset-3 mt-[3rem] flex justify-center space-x-[0.5rem]">
            <button
              onClick={handleCancel}
              className="w-[5rem] rounded-[0.625rem] border-2 border-eventoPurpleBase bg-white px-3 py-2 text-eventoPurpleBase"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="w-[5rem] rounded-[0.625rem] bg-eventoPurpleBase px-3 py-2 text-white"
            >
              저장
            </button>
          </div>
          {errorMessage && (
            <div className="mt-[2rem] text-center text-[1rem] text-darkRed">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
