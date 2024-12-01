import React from "react";
import { FaXmark } from "react-icons/fa6";

export default function DeleteAccountModal({ onClose }) {
  return (
    <div className="flex h-[23rem] w-[35rem] translate-x-[3rem] flex-col items-center justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <p className="mb-[2rem] ml-[2rem] mt-[1.5rem] w-[31.4rem] text-[2rem] font-bold text-eventoPurple">
        정말 탈퇴하시겠어요?
      </p>
      <p className="mb -[0.3rem] ml-[2rem] w-[31.4rem] text-[1.25rem] font-bold text-lightGray">
        탈퇴 버튼 선택 시,
      </p>
      <p className="mb-[5.3rem] ml-[2rem] mt-[1rem] w-[31.4rem] text-[1.25rem] font-bold text-lightGray">
        계정은 삭제되며 복구되지 않습니다.
      </p>
      <div className="flex translate-x-[8rem] space-x-[1rem]">
        <button className="flex h-[2.5rem] w-[5.5rem] items-center justify-center rounded-[0.625rem] border-[0.15rem] border-solid border-darkRed/80 bg-darkRed/80 text-center text-[1rem] font-bold text-white hover:border-darkRed hover:bg-darkRed active:bg-darkRed/50 active:text-darkRed/80">
          <span>회원탈퇴</span>
        </button>
        <button
          onClick={onClose}
          className="flex h-[2.5rem] w-[5.5rem] items-center justify-center rounded-[0.625rem] border-[0.15rem] border-solid border-lightGray text-center text-[1rem] font-bold text-lightGray hover:bg-lightGray/50 active:bg-lightGray active:text-white"
        >
          <span>돌아가기</span>
        </button>
      </div>
    </div>
  );
}
