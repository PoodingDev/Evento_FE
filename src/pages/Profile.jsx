import DeleteAccountModal from "components/DeleteAccountModal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBirthdayCake, FaPen } from "react-icons/fa";
import { IoChevronBack, IoPersonCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userNickname: "",
    userEmail: "",
    userBirth: "",
  });

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 사용자 정보 -> 상태
        const { user_name, user_nickname, user_email, user_birth } =
          response.data;
        setUserInfo({
          userName: user_name,
          userNickname: user_nickname,
          userEmail: user_email,
          userBirth: user_birth,
        });
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류 발생:", error);
      }
    }

    fetchUserInfo();
  }, []);

  const editClick = () =>
    navigate("/profile/edit", {
      state: { ...userInfo },
    });

  const toggleConfirm = () => {
    setIsConfirmOpen((prev) => !prev);
  };

  return (
    <>
      <div className="h-[100vh] bg-eventoWhite pl-[18rem] pt-[4rem]">
        <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
          <Link to="/">
            <IoChevronBack className="text-[1.4rem]" />
          </Link>
          <p className="text-[1.4rem]">&nbsp; 내 프로필</p>
        </div>
        <div className="flex h-full -translate-y-[6rem] items-center justify-center">
          <div className="flex h-[30rem] w-[30rem] flex-col items-center justify-center">
            <IoPersonCircleOutline className="h-[8rem] w-[8rem] text-eventoPurpleBase" />
            <ul className="mt-[0.5rem] space-y-[0.8rem] text-[1.2rem]">
              <li className="text-center text-[1.5rem] font-semibold text-eventoblack">
                {userInfo.userNickname}
              </li>
              <li className="text-center text-[1.4rem] font-semibold text-darkGray">
                {userInfo.userName}
              </li>
              <li className="text-center text-[1.1rem] text-darkGray">
                {userInfo.userEmail}
              </li>
              <li className="flex items-center justify-center gap-1 text-center">
                <FaBirthdayCake className="text-[1.1rem] text-eventoPurpleBase/80" />
                <span className="text-[1.1rem] text-darkGray">
                  {userInfo.userBirth}
                </span>
              </li>
            </ul>
          </div>
          <FaPen
            className="-translate-x-[9rem] -translate-y-[3.5rem] cursor-pointer text-[1rem] text-darkGray"
            onClick={editClick}
          />
        </div>
        <div className="absolute bottom-[3rem] right-[4rem]">
          <button
            onClick={toggleConfirm}
            className="w-[7rem] gap-3 rounded-[0.625rem] border-2 border-lightGray bg-lightGray px-3 py-2 text-eventoWhite hover:border-lightRed hover:bg-lightRed hover:text-darkRed active:border-darkRed active:bg-darkRed active:text-white"
          >
            회원탈퇴
          </button>
        </div>
        {isConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <DeleteAccountModal onClose={toggleConfirm} />
          </div>
        )}
      </div>
    </>
  );
}
