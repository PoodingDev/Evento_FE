import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { FaXmark } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

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

export default function EventInfo({ onClose, eventDetails, setEvents }) {
  // console.log("-------------");
  // console.log(eventDetails);
  // console.log(`${eventDetails.calendarId},${eventDetails.id} `);
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
    newStartDate: new Date(),
    newEndDate: new Date(),
    newEventDetail: "",
    newEventPublic: false,
  });

  const { userInfo } = useAuth();

  //캘린더 색상
  const [calColor, setCalColor] = useState(eventDetails.color);
  const [calTitle, setCalTitle] = useState(eventDetails.cal_title);

  useEffect(() => {
    setCalTitle(eventDetails.cal_title);
  }, [eventDetails.cal_title]);

  //이벤트 정보 가져오기
  useEffect(() => {
    async function fetchEventInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get(
          `/api/calendars/${eventDetails.calendarId}/events/`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const {
          event_id,
          event_title,
          cal_title,
          cal_color,
          start_time,
          end_time,
          event_description,
          is_public,
        } = response.data[1];

        setEventInfo({
          eventId: eventDetails.id,
          eventTitle: eventDetails.title,
          title: eventDetails.cal_title,
          startDate: eventDetails.start,
          endDate: eventDetails.end,
          detailEventMemo: eventDetails.description,
          isEventPublic: is_public,
        });

        setNewEventInfo({
          newEventTitle: eventDetails.title,
          newStartDate: eventDetails.start,
          newEndDate: eventDetails.end,
          newEventDetail: eventDetails.description,
          newEventPublic: false,
        });
      } catch (error) {
        console.error("이벤트 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchEventInfo();
  }, [eventDetails]);

  //캘린더 정보가져오기
  const [calInfo, setCalInfo] = useState({
    calenderName: "",
    members: [],
  });
  useEffect(() => {
    async function fetchCalInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get("/api/calendars/admins/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const selectedCalendar = response.data.find(
          (cal) => cal.calendar_name === eventInfo.title,
        );
        console.log(selectedCalendar);
        console.log(eventInfo.title);

        if (selectedCalendar) {
          setCalInfo({
            calenderName: selectedCalendar.calendar_name,
            members: selectedCalendar.members,
          });
        } else {
          console.error("일치하는 캘린더를 찾을 수 없습니다.");
          // 해당 캘린더가 없을 때 기본 값 설정 (필요에 따라 수정)
        }
      } catch (error) {
        console.error("캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchCalInfo();
  }, [eventInfo.title]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await axios.get(
          `/api/calendars/${eventDetails.calendarId}/events/${eventDetails.id}/comments/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setCommentList(response.data.comments || []);
      } catch (error) {
        console.error("댓글 정보를 가져오는 중 오류 발생:", error);
      }
    }

    fetchComments();
  }, [eventDetails]);

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
  // const [IsCommentLike, setCommentLike] = useState(false);
  // const toggleIsCommentLike = () => setCommentLike(!IsCommentLike);

  //댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    try {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      const response = await axios.post(
        `/api/calendars/${eventDetails.calendarId}/events/${eventDetails.id}/comments/`,
        { content: input },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 새로운 댓글 추가
      setCommentList((prevComments) => [...prevComments, response.data]);
      setInput("");
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  //저장
  const save = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.patch(
        `/api/calendars/${eventDetails.calendarId}/events/${eventDetails.id}/`,
        {
          // event_title: eventInfo.eventTitle,
          // cal_title: eventInfo.title,
          // start_time: eventInfo.startDate,
          // end_time: eventInfo.endDate,
          // event_description: eventInfo.detailEventMemo,
          // is_public: eventInfo.isEventPublic,
          event_title: newEventInfo.newEventTitle,
          cal_title: eventInfo.title,
          start_time: newEventInfo.newStartDate,
          end_time: newEventInfo.newEndDate,
          event_description: newEventInfo.newEventDetail,
          is_public: newEventInfo.newEventPublic,
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
          endDate: newEventInfo.newEndDate,
          detailEventMemo: newEventInfo.newEventDetail,
          isEventPublic: newEventInfo.newEventPublic,
        });

        setEvents((prevEvents) => {
          console.log(prevEvents);
          return prevEvents.map((event) => {
            if (event.id === Number(eventInfo.eventId)) {
              // 수정된 이벤트를 반환하도록
              return {
                ...event,
                title: newEventInfo.newEventTitle, // newEventInfo로 값 수정
                start: new Date(newEventInfo.newStartDate), // 날짜 형식에 맞게 변환
                end: new Date(newEventInfo.newEndDate),
                extendedProps: {
                  memo: newEventInfo.newEventDetail,
                },
              };
            }
            return event; // 수정되지 않은 이벤트는 그대로 반환
          });
        });
        toggleIsEdit();
      }
    } catch (error) {
      console.error("캘린더 수정 실패:", error);
      alert("캘린더 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  //취소
  const cancel = () => {
    setNewEventInfo({
      newEventTitle: eventDetails.title,
      newStartDate: eventDetails.start,
      newEndDate: eventDetails.end,
      newEventDetail: eventDetails.description,
      newEventPublic: eventInfo.isEventPublic,
    });
    toggleIsEdit();
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await axios.delete(`/api/events/${eventInfo.eventId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // 삭제가 성공적으로 완료되었을 때
        setEvents((prevEvents) => {
          return prevEvents.filter(
            (event) => event.id !== Number(eventInfo.eventId),
          ); // 해당 이벤트를 제외한 나머지 반환
        });
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
        <div className="mb-[1rem] flex items-center justify-between">
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
            <div
              className="mb-[1.5rem] flex h-[2rem] justify-center rounded-[2.5rem] px-[1.1rem] text-center text-[1rem] font-bold"
              style={{ backgroundColor: calColor }}
            >
              <div className="flex items-center text-eventoWhite">
                <p>{eventInfo.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* 시간 */}
        {isComment ? (
          <div className="mb-[1rem] flex">
            <FaChevronLeft size={15} onClick={toggleIsComment} />
          </div>
        ) : isEdit ? (
          <>
            <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
              시간
            </div>
            <div className="relative z-10 mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
              <DatePicker
                selected={newEventInfo.newStartDate}
                onChange={(date) =>
                  setNewEventInfo({
                    ...newEventInfo,
                    newStartDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] bg-transparent text-center"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date(2050, 11, 31)}
              />
              <span className="w-[2rem] text-center">&nbsp;-</span>
              <DatePicker
                selected={newEventInfo.newEndDate || newEventInfo.newStartDate}
                onChange={(date) =>
                  setNewEventInfo({
                    ...newEventInfo,
                    newEndDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] bg-transparent text-center"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date(2050, 11, 31)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
              시간
            </div>
            <div className="relative z-10 mb-[2rem] flex w-[25rem] -translate-x-[0.3rem] items-center text-[2rem] font-bold text-darkGray">
              <DatePicker
                selected={newEventInfo.newStartDate}
                onChange={(date) =>
                  setNewEventInfo({
                    ...newEventInfo,
                    newStartDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] bg-transparent text-center"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date(2050, 11, 31)}
                disabled
              />
              <span className="w-[2rem] text-center">&nbsp;-</span>
              <DatePicker
                selected={newEventInfo.newEndDate || newEventInfo.newStartDate}
                onChange={(date) =>
                  setNewEventInfo({
                    ...newEventInfo,
                    newEndDate: date,
                  })
                }
                dateFormat="yyyy-MM-dd"
                className="w-[12rem] bg-transparent text-center"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                minDate={new Date(1900, 0, 1)}
                maxDate={new Date(2050, 11, 31)}
                disabled
              />
            </div>
          </>
        )}

        {/* 일정 상세 */}
        {/* 댓글 */}
        {isComment ? (
          <div className="flex items-center justify-center">
            <div className="h-[16rem] space-y-[0.8rem] overflow-auto px-[1rem]">
              {commentList.map((comment) => {
                return (
                  <div key={comment.id} className="flex flex-wrap">
                    <div className="ml-[0.2rem] w-[42rem] pb-[0.2rem] text-[0.8rem] text-darkGray">{`${comment.username}`}</div>
                    <div
                      style={{ backgroundColor: `${calColor}BB` }}
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
                className="w-[15rem] rounded-md border-b-[0.1rem] bg-lightGray/20 pb-[0.5rem] text-[1rem] text-darkGray placeholder-lightGray focus:outline-none"
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
              className="relative ml-[0.8rem] mr-[1.8rem] mt-[1.2rem] h-[1.8rem] w-[35rem] rounded-full border-[0.15rem] border-lightGray/50 bg-transparent px-[1rem] text-darkGray placeholder-lightGray/50 focus:outline-none"
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
            onClick={cancel}
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
            {calInfo.members === undefined ? (
              <FaRegTrashAlt
                className="cursor-pointer text-[1.5rem] text-darkGray"
                onClick={handleDelete}
              />
            ) : null}
            {calInfo.members &&
              calInfo.members.find((cal) => cal.id === userInfo.user_id) !==
                undefined && (
                <FaRegTrashAlt
                  className="cursor-pointer text-[1.5rem] text-darkGray"
                  onClick={handleDelete}
                />
              )}
          </div>
        </>
      )}
    </div>
  );
}
