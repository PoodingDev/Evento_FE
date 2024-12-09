import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaLock, FaUnlock } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function EventComments({
  onClose,
  eventDetails,
  onSave,
  onCancel,
  setEvents,
}) {
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
        const response = await instance.get(
          `/api/calendars/${eventDetails.cal_id}/events/`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setEventInfo({
          eventId: eventDetails.id,
          eventTitle: eventDetails.title,
          cal_id: eventDetails.calId,
          title: eventDetails.cal_title,
          startDate: eventDetails.start,
          endDate: eventDetails.end,
          detailEventMemo: eventDetails.description,
          isEventPublic: eventDetails.isPublic,
        });

        setNewEventInfo({
          newEventTitle: eventDetails.title,
          newStartDate: eventDetails.start,
          newEndDate: eventDetails.end,
          newEventDetail: eventDetails.description,
          newEventPublic: eventDetails.isPublic,
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
        const response = await instance.get("/api/calendars/admins/", {
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
  //댓글 정보
  const [commentList, setCommentList] = useState(data);
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

        setCommentList(response.data.comments || []);
      } catch (error) {
        console.error("댓글 정보를 가져오는 중 오류 발생:", error);
      }
    }

    fetchComments();
  }, [eventDetails]);

  //수정 및 편집
  const toggleIsPublic = () => {
    setNewEventInfo((prevState) => ({
      ...prevState,
      newEventPublic: !newEventInfo.newEventPublic,
    }));
  };

  //북마크
  const [isLike, setIsLike] = useState(false);
  const toggleIsLike = () => setIsLike(!isLike);
  const [input, setInput] = useState("");

  //댓글 작성
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

      // 새로운 댓글 추가
      setCommentList((prevComments) => [...prevComments, response.data]);
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
