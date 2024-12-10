import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { FaLock, FaToggleOff, FaToggleOn, FaUnlock } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { instance } from "../api/axios";

export default function EventEdit({
  onClose,
  eventDetails,
  setEventInfo,
  eventInfo,
  onSave,
  onCancel,
  setEvents,
}) {
  //상태 관리
  const [newEventInfo, setNewEventInfo] = useState({
    newEventTitle: "",
    newStartDate: new Date(),
    newEndDate: new Date(),
    newEventDetail: "",
    newEventPublic: false,
  });

  //이벤트 정보 가져오기
  useEffect(() => {
    setNewEventInfo({
      newEventTitle: eventInfo.eventTitle,
      newStartDate: eventInfo.startDate,
      newEndDate: eventInfo.endDate,
      newEventDetail: eventInfo.detailEventMemo,
      newEventPublic: eventInfo.isEventPublic,
    });
  }, []);

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

  //저장
  const save = async () => {
    try {
      const token = localStorage.getItem("token"); // 토큰 가져오기
      const response = await instance.patch(
        `/api/events/${eventDetails.id}/`,
        {
          title: newEventInfo.newEventTitle,
          // cal_title: eventInfo.title,
          start_time: newEventInfo.newStartDate,
          end_time: newEventInfo.newEndDate,
          description: newEventInfo.newEventDetail,
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
        onSave();
      }
    } catch (error) {
      console.error("캘린더 수정 실패:", error);
      alert("캘린더 수정에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  console.log(newEventInfo);

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
              {newEventInfo.newEventPublic ? (
                <FaUnlock size={20} />
              ) : (
                <FaLock size={20} />
              )}
            </div>
            <input
              type="text"
              value={newEventInfo.newEventTitle}
              className="ml-[.5rem] h-[2.7rem] w-[25rem] rounded-md bg-lightGray/20 pl-[.5rem] text-[2.3rem] font-bold text-darkGray placeholder-lightGray focus:outline-none"
              onChange={(e) => {
                setNewEventInfo({
                  ...newEventInfo,
                  newEventTitle: e.target.value,
                });
              }}
            />
          </div>
        </div>

        {/* 캘린더 제목 */}
        <div className="flex">
          <div
            className="mb-[1.5rem] flex h-[2rem] justify-center rounded-[2.5rem] px-[1.1rem] text-center text-[1rem] font-bold"
            style={{ backgroundColor: eventDetails.color }}
          >
            <div className="flex items-center text-eventoWhite">
              <p>{eventDetails.cal_title}</p>
            </div>
          </div>
        </div>

        {/* 시간 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          시간
        </div>
        <div className="relative z-10 mb-[2rem] flex w-[25rem] -translate-x-[0.5rem] items-center text-[2rem] font-bold text-darkGray">
          <DatePicker
            selected={newEventInfo.newStartDate}
            onChange={(date) =>
              setNewEventInfo({
                ...newEventInfo,
                newStartDate: date,
              })
            }
            dateFormat="yyyy-MM-dd"
            className="w-[13rem] rounded-md bg-lightGray/20 px-[.6rem] text-center"
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
            className="ml-[.5rem] w-[13rem] rounded-md bg-lightGray/20 px-[.6rem] text-center"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date(2050, 11, 31)}
          />
        </div>

        {/* 일정 상세 */}

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
            className="flex h-[2rem] w-[15rem] items-center rounded-md bg-lightGray/30 pb-[0.5rem] pl-[0.2rem] pt-[0.1rem] text-[1.2rem] text-darkGray placeholder-lightGray focus:outline-none"
          />
        </div>

        {/* 기타 아이콘 */}

        <div className="mb-[2rem]">
          <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
            이벤트 공개 여부
          </div>
          <div className="flex items-center space-x-[0.5rem] text-[1rem] text-darkGray">
            <p>구독자들에게 공개하기</p>
            {newEventInfo.newEventPublic === true ? (
              <FaToggleOn
                size={25}
                className="cursor-pointer text-eventoPurple"
                onClick={toggleIsPublic}
              />
            ) : (
              <FaToggleOff
                size={25}
                className="cursor-pointer text-eventoPurple"
                onClick={toggleIsPublic}
              />
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[2rem] right-[2rem] flex space-x-[0.5rem]">
        <button
          className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple/80 text-center text-[1.1rem] text-eventoPurple/80 hover:bg-eventoPurpleLight/70 active:bg-eventoPurpleLight"
          onClick={() => onCancel()}
        >
          <span>취소</span>
        </button>
        <button
          onClick={() => {
            save();
            onCancel();
          }}
          className="flex h-[2.5rem] w-[5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple/90 text-center text-[1.1rem] text-eventoWhite hover:bg-eventoPurple/70 active:bg-eventoPurple/50"
        >
          <span>저장</span>
        </button>
      </div>
    </div>
  );
}
