import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

import {
  FaLock,
  FaUnlock,
  FaBookmark,
  FaRegBookmark,
  FaRegTrashAlt,
  FaPen,
  FaCommentAlt,
  FaCaretDown,
  FaToggleOn,
  FaToggleOff,
  FaChevronLeft,
  FaComment,
  FaRegCommentDots,
} from "react-icons/fa";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function EventInfo({ onClose }) {
  //초기 값 세팅
  const [eventInfo, setEventInfo] = useState({
    eventId: "",
    eventTitle: "",
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    detailEventMemo: "",
    isEventPublic: false,
  });

  //상태 관리
  const [newEventInfo, setNewEventInfo] = useState({
    newEventTitle: "",
    newStartDate: "",
    newEndDate: "",
    newEventDetail: "",
    newEventPublic: false,
  });

  useEffect(() => {
    async function fetchEventInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get("/api/calendars/:calendar_id/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const {
          event_id,
          event_title,
          cal_title,
          start_time,
          end_time,
          event_description,
          is_public,
        } = response.data[0];

        setEventInfo({
          eventId: event_id,
          eventTitle: event_title,
          title: cal_title,
          startDate: start_time,
          endDate: end_time,
          detailEventMemo: event_description,
          isEventPublic: is_public,
        });
        setNewEventInfo({
          newEventTitle: event_title,
          newStartDate: start_time,
          newEndDate: end_time,
          newEventDetail: event_description,
          newEventPublic: is_public,
        });
      } catch (error) {
        console.error("이벤트 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchEventInfo();
  }, []);

  //수정 및 편집
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const toggleIsPublic = () => {
    setNewEventInfo((prevState) => ({
      ...prevState,
      newEventPublic: !newEventInfo.newEventPublic,
    }));
  };

  //북마크
  const [isLike, setIsLike] = useState(false);
  const toggleIsLike = () => setIsLike(!isLike);

  //댓글
  const data = [
    {
      id: 1,
      username: "호선",
      content: "이날 뭐 먹을까용?",
      isLike: false,
      likeNum: 0,
    },
    {
      id: 2,
      username: "채영",
      content: "고기 어때유",
      isLike: false,
      likeNum: 0,
    },
    {
      id: 3,
      username: "수진",
      content: "오 너무 좋아용",
      isLike: false,
      likeNum: 0,
    },
    {
      id: 4,
      username: "호선",
      content: "고기 ㄱㄱ",
      isLike: false,
      likeNum: 0,
    },
  ];
  const [isComment, setIsComment] = useState(false);
  const toggleIsComment = () => setIsComment(!isComment);
  const [input, setInput] = useState("");
  const [commentList, setCommentList] = useState(data);

  //댓글 공감
  const [IsCommentLike, setCommentLike] = useState(false);
  const toggleIsCommentLike = () => setCommentLike(!IsCommentLike);

  //댓글 작성
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const newComment = {
        id: commentList.length + 1,
        username: "수진", //현재 사용자 이름
        content: input,
      };
      setCommentList([...commentList, newComment]);
      setInput("");
    }
  };

  //저장
  const save = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.patch(
        `/api/calendars/10/events/${eventInfo.eventId}`,
        {
          event_title: eventInfo.eventTitle,
          cal_title: eventInfo.title,
          start_time: eventInfo.startDate,
          end_time: eventInfo.endDate,
          event_description: eventInfo.detailEventMemo,
          is_public: eventInfo.isEventPublic,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setEventInfo({
          eventTitle: newEventInfo.newEventTitle,
          title: eventInfo.title,
          startDate: newEventInfo.newStartDate,
          endDate: newEventInfo.newStartDate,
          detailEventMemo: newEventInfo.newEventDetail,
          isEventPublic: newEventInfo.newEventPublic,
        });
        toggleIsEdit();
      }
    } catch (error) {
      console.error("캘린더 수정 실패:", error);
      alert("캘린더 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  //취소
  const cancle = () => {
    setNewEventInfo({
      newEventTitle: eventInfo.eventTitle,
      newStartDate: eventInfo.startDate,
      newEndDate: eventInfo.endDate,
      newEventDetail: eventInfo.detailEventMemo,
      newEventPublic: eventInfo.isEventPublic,
    });
    toggleIsEdit();
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.delete(`/api/events/${eventInfo.eventId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // 삭제가 성공적으로 완료되었을 때
        alert("이벤트가 성공적으로 삭제되었습니다.");
        onClose(); // 삭제 후 모달 닫기
      }
    } catch (error) {
      console.error("이벤트 삭제 실패:", error);
      alert("이벤트 삭제에 실패했습니다. 다시 시도해 주세요.");
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
        <div className="mb-[1.5rem] flex items-center justify-between">
          {/* 이벤트 제목 */}
          {isEdit ? (
            <div className="flex items-center">
              <div className="text-darkGray">
                {newEventInfo.newEventPublic ? (
                  <FaLock size={20} />
                ) : (
                  <FaUnlock size={20} />
                )}
              </div>
              <input
                type="text"
                value={newEventInfo.newEventTitle}
                className="ml-[1rem] h-[2.5rem] w-full rounded-md bg-eventoPurple bg-lightGray/20 text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
                onChange={(e) => {
                  setNewEventInfo({
                    ...newEventInfo,
                    newEventTitle: e.target.value,
                  });
                }}
              />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="text-darkGray">
                {eventInfo.isEventPublic ? (
                  <FaLock size={20} />
                ) : (
                  <FaUnlock size={20} />
                )}
              </div>
              <input
                type="text"
                value={eventInfo.eventTitle}
                className="ml-[1rem] h-[2.5rem] w-full bg-transparent text-[2.5rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
                onChange={(e) => {
                  setEventInfo({
                    eventTitle: e.target.value,
                  });
                }}
                disabled
              />
            </div>
          )}
        </div>

        {/* 캘린더 제목 */}
        {isComment ? (
          ""
        ) : (
          <div className="flex">
            <div className="mb-[1.5rem] flex h-[2rem] w-[9rem] justify-center rounded-[2.5rem] bg-eventoYellow text-center text-[1rem] font-bold">
              <div className="flex items-center">
                <p>{`${eventInfo.title}`}</p>
              </div>
            </div>
          </div>
        )}

        {/* 시간 */}
        {isComment ? (
          <div className="mb-[1rem] flex">
            <FaChevronLeft size={20} onClick={toggleIsComment} />
          </div>
        ) : isEdit ? (
          <>
            <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
              시간
            </div>
            <div className="mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
              <DatePicker
                selected={newEventInfo.newStartDate}
                onChange={(date) =>
                  setNewEventInfo({
                    ...newEventInfo,
                    newStartDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] rounded-md bg-lightGray/20 text-center"
              />
              <span className="w-[2rem] text-center">-</span>
              <DatePicker
                selected={newEventInfo.newEndDate}
                onChange={(date) =>
                  setNewEventInfo({
                    ...newEventInfo,
                    newEndDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] rounded-md bg-lightGray/20 text-center"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
              시간
            </div>
            <div className="mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
              <DatePicker
                selected={eventInfo.startDate}
                onChange={(date) =>
                  setEventInfo({
                    startDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] bg-transparent text-center"
                disabled
              />
              <span className="w-[2rem] text-center">-</span>
              <DatePicker
                selected={eventInfo.endDate}
                onChange={(date) =>
                  setEventInfo({
                    startDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] bg-transparent text-center"
                disabled
              />
            </div>
          </>
        )}

        {/* 일정 상세 */}
        {isComment ? (
          <div className="h-[16rem] overflow-auto">
            {commentList.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="mb-[0.5rem] flex flex-wrap pt-[0.5rem]"
                >
                  <div className="w-[42rem] text-lightGray">{`${comment.username}`}</div>
                  <div className="mr-[1rem] flex items-center rounded-[0.3rem] font-medium leading-[1.5rem]">
                    {`${comment.content}`}
                    {IsCommentLike ? (
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : isEdit ? (
          <>
            <div className="mb-[2rem]">
              <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                일정 상세
              </div>
              <input
                type="text"
                value={newEventInfo.newEventDetail}
                onChange={(e) => {
                  setNewEventInfo({
                    ...newEventInfo,
                    newEventDetail: e.target.value,
                  });
                }}
                className="w-[15rem] rounded-md border-b-[0.1rem] border-solid border-eventoPurple bg-lightGray/20 pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-[2rem]">
              <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                일정 상세
              </div>
              <input
                type="text"
                value={eventInfo.detailEventMemo}
                onChange={(e) => {
                  setEventInfo({ detailEventMemo: e.target.value });
                }}
                className="w-[15rem] bg-transparent pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
                disabled
              />
            </div>
          </>
        )}

        {/* 기타 아이콘 */}
        {isComment ? (
          //댓글 입력 창
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              className="relative mt-[0.7rem] h-[1.8rem] w-[37rem] rounded-full border-[0.15rem] border-lightGray bg-transparent px-[1rem] text-darkGray focus:outline-none"
              onChange={(e) => setInput(e.target.value)}
              placeholder="댓글을 입력하세요"
            />
          </form>
        ) : isEdit ? (
          <div className="mb-[2rem]">
            <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
              이벤트 공개 여부
            </div>
            <div className="flex items-center space-x-[0.5rem] text-[1rem] text-darkGray">
              <p>구독자들에게 공개하기</p>
              {newEventInfo.newEventPublic === true ? (
                <FaToggleOff
                  size={25}
                  className="cursor-pointer text-eventoPurple"
                  onClick={toggleIsPublic}
                />
              ) : (
                <FaToggleOn
                  size={25}
                  className="cursor-pointer text-eventoPurple"
                  onClick={toggleIsPublic}
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {isEdit ? (
        <div className="absolute bottom-[2rem] right-[2rem] flex space-x-[0.5rem]">
          <button
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
            onClick={cancle}
          >
            <span>취소</span>
          </button>
          <button
            onClick={save}
            className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50"
          >
            <span>저장</span>
          </button>
        </div>
      ) : isComment ? (
        ""
      ) : (
        <>
          <div className="absolute bottom-[3rem] left-[3rem] flex space-x-[0.5rem] text-[1.5rem] text-darkGray">
            {isLike ? (
              <FaBookmark size={25} onClick={toggleIsLike} />
            ) : (
              <FaRegBookmark size={25} onClick={toggleIsLike} />
            )}
            <FaRegCommentDots size={25} onClick={toggleIsComment} />
          </div>
          <div className="absolute bottom-[3rem] right-[3rem] flex space-x-[0.5rem] text-[1.5rem] text-darkGray">
            <FaPen onClick={toggleIsEdit} />
            <FaRegTrashAlt
              className="cursor-pointer text-[1.5rem] text-darkGray"
              onClick={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}
