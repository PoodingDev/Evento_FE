import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaLock, FaUnlock } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function EventComments({ onClose, eventDetails, onCancel }) {
  const user_nickname = localStorage.getItem("user_nickname");
  // const data = [
  //   {
  //     id: 1,
  //     username: "호선",
  //     content: "이날 뭐 먹을까용?",
  //     isLike: false,
  //     likeNum: 0,
  //   },
  //   {
  //     id: 2,
  //     username: "채영",
  //     content: "고기 어때유",
  //     isLike: false,
  //     likeNum: 0,
  //   },
  //   {
  //     id: 3,
  //     username: "수진",
  //     content: "오 너무 좋아용",
  //     isLike: false,
  //     likeNum: 0,
  //   },
  //   {
  //     id: 4,
  //     username: "호선",
  //     content: "고기 ㄱㄱ",
  //     isLike: false,
  //     likeNum: 0,
  //   },
  // ];
  //댓글 정보
  const [commentList, setCommentList] = useState([
    {
      comment_id: 0,
      content: "",
      admin_nickname: "",
    },
  ]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await instance.get(
          `/api/events/${eventDetails.id}/comments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCommentList(response.data || []);
      } catch (error) {
        console.error("댓글 정보를 가져오는 중 오류 발생:", error);
      }
    }

    fetchComments();
  }, [eventDetails]);

  //댓글 작성
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    try {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      const response = await instance.post(
        `/api/events/${eventDetails.id}/comments/`,
        { content: input },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 새로운 댓글 추가 (닉네임을 로컬에서 설정)
      const newComment = {
        comment_id: response.data.comment_id,
        content: response.data.content,
        admin_nickname: user_nickname, // 로컬 스토리지의 닉네임 사용
      };

      setCommentList((prevComments) => [...prevComments, newComment]);
      setInput("");
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  return (
    <div className="flex h-[29rem] w-[43rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
      <FaXmark
        size={25}
        className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
        onClick={onClose}
      />
      <div className="flex w-full flex-col">
        <div className="mb-[1rem] flex items-center justify-between">
          {/* 이벤트 제목 */}
          <div className="flex items-center">
            <div className="text-darkGray">
              {eventDetails.isPublic ? (
                <FaUnlock size={20} />
              ) : (
                <FaLock size={20} />
              )}
            </div>
            <p className="ml-[1rem] h-[2.5rem] w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none">
              {eventDetails.title}
            </p>
          </div>
        </div>

        {/* 캘린더 제목 */}

        <div className="mb-[1rem] flex">
          <FaChevronLeft size={15} onClick={() => onCancel()} />
        </div>
        {/* 일정 상세 */}
        {/* 댓글 */}
        <div className="flex items-center justify-center">
          <div className="h-[16rem] space-y-[0.8rem] overflow-auto px-[1rem]">
            {commentList.map((comment) => {
              return (
                <div key={comment.comment_id} className="flex flex-wrap">
                  <div className="ml-[0.2rem] w-[42rem] pb-[0.2rem] text-[0.8rem] text-darkGray">{`${comment.admin_nickname}`}</div>
                  <div
                    style={{ backgroundColor: `${eventDetails.color}` }}
                    className="mr-[1rem] flex items-center rounded-[0.6rem] px-[0.7rem] py-[0.2rem] text-[0.9rem] leading-[1.5rem] text-eventoWhite"
                  >
                    {`${comment.content}`}
                    {/* {IsCommentLike ? (
                      <AiTwotoneLike
                        className="ml-[1rem] text-eventoPurple"
                        onClick={toggleIsCommentLike}
                        size={15}
                      />
                    ) : (
                      <AiOutlineLike
                        className="ml-[1rem] text-eventoPurple"
                        onClick={toggleIsCommentLike}
                        size={15}
                      />
                    )} */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 기타 아이콘 */}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            className="relative ml-[0.8rem] mr-[1.8rem] mt-[1.2rem] h-[1.8rem] w-[35rem] rounded-full border-[0.15rem] border-lightGray/50 bg-transparent px-[1rem] text-darkGray placeholder-lightGray/50 focus:outline-none"
            onChange={(e) => setInput(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
        </form>
      </div>
    </div>
  );
}
