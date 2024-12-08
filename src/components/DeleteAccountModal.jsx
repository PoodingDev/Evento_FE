import React from "react";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { instance } from "../api/axios";

export default function DeleteAccountModal({ onClose }) {
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await instance.delete("/api/users/delete/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert(response.data.message); // "회원탈퇴가 완료되었습니다."
        localStorage.removeItem("token"); // 토큰 제거
        localStorage.removeItem("refreshToken"); //refresh 토큰제거
        navigate("/login");
      }
    } catch (error) {
      console.error("회원탈퇴 중 오류 발생:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex h-[23rem] w-[35rem] translate-x-[3rem] flex-col items-center justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <p className="mb-[2rem] ml-[2rem] mt-[1.5rem] w-[31.4rem] text-[2rem] font-bold text-darkRed/70">
        정말 탈퇴하시겠어요?
      </p>
      <p className="ml-[3rem] w-[31.4rem] text-[1.2rem] font-semibold text-darkGray">
        탈퇴 버튼 선택 시,
      </p>
      <p className="mb-[5.3rem] ml-[3rem] mt-[1rem] w-[31.4rem] text-[1.3rem] font-bold text-darkRed/70">
        계정은 삭제되며 복구되지 않습니다.
      </p>
      <div className="flex translate-x-[8rem] space-x-[1rem]">
        <button
          onClick={handleDeleteAccount}
          className="flex h-[2.5rem] w-[5.5rem] items-center justify-center rounded-[0.625rem] border-[0.15rem] border-solid border-darkRed/30 bg-darkRed/85 text-center text-[1rem] font-bold text-white hover:border-darkRed hover:bg-darkRed active:bg-darkRed/50 active:text-darkRed/80"
        >
          <span>회원탈퇴</span>
        </button>
        <button
          onClick={onClose}
          className="flex h-[2.5rem] w-[5.5rem] items-center justify-center rounded-[0.625rem] border-[0.15rem] border-solid border-lightGray text-center text-[1rem] font-bold text-lightGray hover:bg-lightGray/30 active:bg-lightGray active:text-white"
        >
          <span>돌아가기</span>
        </button>
      </div>
    </div>
  );
}
