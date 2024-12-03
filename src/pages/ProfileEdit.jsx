import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // 사용자 ID
  const [userName, setUserName] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userBirth, setUserBirth] = useState(null); // DatePicker에서 사용하는 Date 객체
  const [isToggled, setIsToggled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 사용자 정보 가져오기
  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const {
          user_id,
          user_name,
          user_nickname,
          user_email,
          user_birth,
          is_birth_public,
        } = response.data;

        setUserId(user_id);
        setUserName(user_name);
        setUserNickname(user_nickname);
        setUserEmail(user_email);
        setIsToggled(is_birth_public);

        // 날짜를 Date 객체로 변환
        if (user_birth) {
          const parsedDate = new Date(user_birth);
          if (!isNaN(parsedDate.getTime())) {
            setUserBirth(parsedDate);
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
        setErrorMessage(
          "사용자 정보를 불러오지 못했습니다. 다시 시도해 주세요.",
        );
      }
    }

    fetchUserInfo();
  }, []);

  // 닉네임 수정 핸들러
  const handleNickName = (e) => {
    setUserNickname(e.target.value);
  };

  // 토글 상태 변경 핸들러
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!userId) {
        throw new Error("사용자 ID를 찾을 수 없습니다.");
      }

      const response = await axios.post(
        `/api/users/${userId}`,
        {
          user_nickname: userNickname,
          user_birth: userBirth
            ? userBirth.toISOString().substring(0, 10)
            : null, // 날짜를 ISO 문자열로 변환
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
        navigate(-1);
      }
    } catch (error) {
      console.error("사용자 정보 수정 실패:", error);

      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          setErrorMessage("로그인이 필요합니다.");
        } else if (status === 404) {
          setErrorMessage("현재 로그인된 사용자의 정보를 찾을 수 없습니다.");
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
                value={userNickname}
                onChange={handleNickName}
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
                <span className="font-semibold text-darkGray">내 생일</span>
                <DatePicker
                  selected={userBirth}
                  onChange={(date) => setUserBirth(date)} // Date 객체 업데이트
                  dateFormat="yyyy-MM-dd"
                  className="p-1 text-right rounded-lg bg-eventoWhite text-darkGray"
                />
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
