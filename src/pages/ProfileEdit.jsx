import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { IoCalendarOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [isToggled, setIsToggled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 사용자 정보 가져오기 (GET 요청)
  useEffect(() => {
    async function fetchUserData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;

        setUserName(userData.user_name);
        setUserNickname(userData.user_nickname);
        setUserEmail(userData.user_email);
        setUserBirth(userData.user_birth);
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        setErrorMessage(
          "사용자 정보를 불러오지 못했습니다. 다시 시도해 주세요.",
        );
      }
    }

    fetchUserData();
  }, []);

  // 닉네임 수정 핸들러
  const handleNickName = (e) => {
    setUserNickname(e.target.value);
  };

  // 토글 상태 변경 핸들러
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  // 저장 버튼 클릭 핸들러 (POST 요청)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/users/${1}`, // 사용자의 ID를 지정 (임시로 ID 1 사용)
        {
          user_nickname: userNickname,
          user_birth: userBirth,
          is_birth_public: isToggled,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        alert("변경된 닉네임과 공개 상태가 저장되었습니다!");
        navigate(-1); // 이전 페이지로 이동
      }
    } catch (error) {
      console.error("사용자 정보 수정 실패:", error);
      setErrorMessage("사용자 정보를 수정하지 못했습니다. 다시 시도해 주세요.");
    }
  };

  // 취소 버튼 클릭 핸들러
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
                  value={userNickname}
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
            {errorMessage && (
              <div className="mt-4 text-red-600">{errorMessage}</div>
            )}
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
