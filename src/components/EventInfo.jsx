import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import EventComments from "./EventComments";
import EventEdit from "./EventEdit";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";
import { useAuth } from "../context/AuthContext";

import {
  FaLock,
  FaUnlock,
  FaRegTrashAlt,
  FaPen,
  FaRegCommentDots,
} from "react-icons/fa";
export default function EventInfo({ onClose, eventDetails, setEvents }) {
  const user_id = localStorage.getItem("user_id");
  const user_nickname = localStorage.getItem("user_nickname");
  const [viewMode, setViewMode] = useState("info");

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };
  const handleSave = () => {
    setViewMode("info");
  };

  const [eventInfo, setEventInfo] = useState({
    eventId: "",
    eventTitle: "",
    calId: 0,
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

  //캘린더 색상
  const [calColor, setCalColor] = useState(eventDetails.color);
  const [calTitle, setCalTitle] = useState(eventDetails.cal_title);

  useEffect(() => {
    setCalTitle(eventDetails.cal_title);
  }, [eventDetails.cal_title]);

  //이벤트 정보 가져오기
  useEffect(() => {
    setEventInfo({
      eventId: eventDetails.id,
      eventTitle: eventDetails.title,
      cal_id: eventDetails.cal_id,
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
  }, [eventDetails]);

  //캘린더 정보가져오기
  const [calInfo, setCalInfo] = useState({
    calenderName: "",
    isPublic: false,
    members: [],
  });
  useEffect(() => {
    async function fetchCalInfo() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await instance.get("/api/calendars/admin/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const selectedCalendar = response.data.find(
          (cal) => cal.calendar_id === eventInfo.cal_id,
        );
        console.log("aaaaaaaaa", response.data);
        console.log("dkdk", eventInfo);
        console.log("dkdk", selectedCalendar);
        if (selectedCalendar) {
          setCalInfo({
            calenderName: selectedCalendar.name,
            isPublic: selectedCalendar.is_public,
            members: selectedCalendar.admins,
          });
        } else {
          console.error("일치하는 캘린더를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchCalInfo();
  }, [eventInfo.title]);

  useEffect(() => {
    async function fetchLike() {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
        const response = await instance.get(
          `/api/events/${eventInfo.eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setIsLike(response.is_liked);
      } catch (error) {
        console.error("캘린더 정보를 가져오는 중 오류 발생:", error);
      }
    }
    fetchLike();
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
  const [isLike, setIsLike] = useState(eventInfo.is_liked);
  // 좋아요 상태를 서버에서 가져오기
  const fetchLikeStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get(`/api/events/${eventInfo.eventId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { is_liked } = response.data; // 서버에서 가져온 is_liked 값
        setIsLike(is_liked); // 상태 업데이트
      } else {
        console.error("좋아요 상태를 가져오지 못했습니다.");
      }
    } catch (error) {
      console.error("좋아요 상태를 가져오는 중 오류 발생:", error);
    }
  };

  // 좋아요 상태 토글
  const toggleIsLike = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isLike) {
        // 좋아요 취소
        const response = await instance.delete(
          `/api/users/${user_id}/favorites/${eventInfo.eventId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 204) {
          console.log("좋아요가 취소되었습니다.");
          await fetchLikeStatus(); // 최신 상태 다시 가져오기
        }
      } else {
        // 좋아요 추가
        const response = await instance.post(
          `/api/users/${user_id}/favorites/`,
          { event_id: eventInfo.eventId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 201) {
          console.log("좋아요가 추가되었습니다.");
          await fetchLikeStatus(); // 최신 상태 다시 가져오기
        }
      }
    } catch (error) {
      console.error("좋아요 상태 변경 중 오류 발생:", error);
    }
  };

  // 초기 좋아요 상태 가져오기
  useEffect(() => {
    if (eventInfo.eventId) {
      fetchLikeStatus();
    }
  }, [eventInfo.eventId]);

  const [isComment, setIsComment] = useState(false);
  const toggleIsComment = () => setIsComment(!isComment);
  const [input, setInput] = useState("");

  //댓글 공감
  // const [IsCommentLike, setCommentLike] = useState(false);
  // const toggleIsCommentLike = () => setCommentLike(!IsCommentLike);

  //댓글 작성
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    try {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      const response = await instance.post(
        `/api/calendars/${eventDetails.cal_id}/events/${eventDetails.id}/comments/`,
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
      const response = await instance.patch(
        `/api/calendars/${eventDetails.cal_id}/events/${eventDetails.id}/`,
        {
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
                isPublic: newEventInfo.newEventPublic,
              };
            }
            return event; // 수정되지 않은 이벤트는 그대로 반환
          });
        });
        setViewMode("info");
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
      newEventPublic: eventDetails.isEventPublic,
    });
    setViewMode("info");
  };

  // 삭제
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await instance.delete(
        `/api/events/${eventInfo.eventId}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 204) {
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
  console.log(calInfo);

  return (
    <>
      {viewMode === "edit" ? (
        <EventEdit
          onClose={onClose}
          eventDetails={eventDetails}
          eventInfo={eventInfo}
          calInfo={calInfo}
          setEventInfo={setEventInfo}
          onSave={() => save}
          onCancel={() => handleViewChange("info")}
          setEvents={setEvents}
        />
      ) : viewMode === "comments" ? (
        <EventComments
          onClose={onClose}
          eventDetails={eventDetails}
          onSave={() => save}
          onCancel={() => handleViewChange("info")}
          setEvents={setEvents}
        />
      ) : (
        <div>
          <div className="flex h-[29rem] w-[43rem] translate-x-[3rem] justify-center rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
            <FaXmark
              size={25}
              className="absolute right-[1.2rem] top-[1.2rem] cursor-pointer text-darkGray"
              onClick={() => {
                handleViewChange("info");
                onClose();
              }}
            />
            <div className="flex w-full flex-col">
              <div className="mb-[1rem] flex items-center justify-between">
                {/* 이벤트 제목 */}
                <div className="flex items-center">
                  <div className="text-darkGray">
                    {eventInfo.isEventPublic ? (
                      <FaUnlock size={20} />
                    ) : (
                      <FaLock size={20} />
                    )}
                  </div>
                  <input
                    type="text"
                    value={eventInfo.eventTitle}
                    className="ml-[.5rem] h-[2.7rem] w-[25rem] rounded-md bg-transparent pl-[.5rem] text-[2.3rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
                    disabled
                  />
                </div>
              </div>

              {/* 캘린더 제목 */}

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

              {/* 시간 */}

              <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                시간
              </div>
              <div className="relative z-10 mb-[2rem] flex w-[25rem] -translate-x-[0.5rem] items-center text-[2rem] font-bold text-darkGray">
                <DatePicker
                  selected={eventInfo.startDate}
                  dateFormat="yyyy-MM-dd"
                  className="w-[13rem] rounded-md bg-transparent px-[.6rem] text-center"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  minDate={new Date(1900, 0, 1)}
                  maxDate={new Date(2050, 11, 31)}
                  disabled
                />
                <span className="w-[2rem] text-center">&nbsp;-</span>
                <DatePicker
                  selected={eventInfo.endDate || eventInfo.startDate}
                  dateFormat="yyyy-MM-dd"
                  className="ml-[.3rem] w-[13rem] rounded-md bg-transparent pr-[1rem] text-center"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  minDate={new Date(1900, 0, 1)}
                  maxDate={new Date(2050, 11, 31)}
                  disabled
                />
              </div>

              {/* 일정 상세 */}
              {/* 댓글 */}

              <div className="mb-[2rem]">
                <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
                  일정 상세
                </div>
                <input
                  type="text"
                  value={eventInfo.detailEventMemo}
                  className="flex h-[2rem] w-[15rem] items-center rounded-md bg-transparent pb-[0.5rem] pl-[0.2rem] pt-[0.5rem] text-[1.2rem] text-darkGray placeholder-lightGray focus:outline-none"
                  disabled
                />
              </div>

              {/* 기타 아이콘 */}
            </div>

            <div className="absolute bottom-[3rem] left-[3rem] flex space-x-[0.5rem] text-[1.5rem] text-darkGray">
              {isLike ? (
                <FaHeart size={25} onClick={toggleIsLike} />
              ) : (
                <FaRegHeart size={25} onClick={toggleIsLike} />
              )}
              <FaRegCommentDots
                size={25}
                onClick={() => handleViewChange("comments")}
              />
            </div>
            {calInfo.members &&
              calInfo.members.find((cal) => cal === user_nickname) !==
                undefined && (
                <div className="absolute bottom-[3rem] right-[3rem] flex space-x-[0.5rem] text-[1.5rem] text-darkGray">
                  <FaPen onClick={() => handleViewChange("edit")} />

                  <FaRegTrashAlt
                    className="cursor-pointer text-[1.5rem] text-darkGray"
                    onClick={handleDelete}
                  />
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}
