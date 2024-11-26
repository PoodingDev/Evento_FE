import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
} from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

export default function EventInfo() {
  //수정 및 편집
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //댓글
  const [isComment, setIsComment] = useState(false);
  const toggleIsComment = () => setIsComment(!isComment);

  //이벤트 제목(일정 이름)
  const [eventTitle, setEventTitle] = useState("저녁 약속");

  //시간
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  //이벤트 상세
  const [detailEventMemo, setDetailEventMemo] = useState("고기 먹자");

  //공개
  const [isEventPublic, setIsEventPublic] = useState(false);
  const toggleIsPublic = () => setIsEventPublic(!isEventPublic);

  //북마크
  const [isLike, setIsLike] = useState(false);
  const toggleIsLike = () => setIsLike(!isLike);

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[29rem] w-[43rem] rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
        <div className="flex flex-wrap justify-between">
          {/* 이벤트 제목 */}
          {isEdit ? (
            <input
              type="text"
              placeholder={`${eventTitle}`}
              className="mb-[0.8rem] h-[4.75rem] w-[30rem] bg-transparent text-[4rem] font-bold"
              onChange={(e) => {
                setEventTitle(e.target.value);
              }}
            />
          ) : (
            <div className="flex">
              <div className="mb-[0.8rem] h-[4.75rem] text-[4rem] font-bold">
                {`${eventTitle}`}
              </div>
              <div className="ml-[2rem] mt-[1rem]">
                {isEventPublic ? <FaLock size={25} /> : <FaUnlock size={25} />}
              </div>
            </div>
          )}
          <FaXmark size={25} />
        </div>

        {/* 캘린더 제목 */}
        {isComment ? (
          <div className="flex">
            <div className="mb-[1.6rem] h-[1.5rem] w-[10rem] rounded-[3rem] bg-eventoYellow text-center text-[1.25rem] font-bold leading-[1.7rem]">
              Pooding팀
            </div>
            <div className="ml-[1rem] text-[1.5rem] font-bold leading-[1.7rem]">
              고기 먹자!
            </div>
          </div>
        ) : isEdit ? (
          <div className="mb-[2.5rem] flex h-[1.5rem] w-[10rem] justify-center rounded-[3rem] bg-eventoYellow text-center text-[1.25rem] font-bold leading-[1.7rem]">
            <FaCaretDown size={25} />
            <p>Pooding팀</p>
          </div>
        ) : (
          <div className="mb-[2.5rem] h-[1.5rem] w-[10rem] rounded-[3rem] bg-eventoYellow text-center text-[1.25rem] font-bold leading-[1.7rem]">
            Pooding팀
          </div>
        )}

        {/* 시간 */}
        {isComment ? (
          <div className="flex">
            <FaChevronLeft size={20} onClick={toggleIsComment} />
            <div className="mb-[1rem] ml-[0.5rem] font-medium leading-[1.3rem]">
              댓글
            </div>
          </div>
        ) : isEdit ? (
          <>
            <div className="mb-[0.25rem] text-[1rem] font-bold text-eventoPurple">
              시간
            </div>
            <div className="mb-[2rem] flex h-[2rem] text-[2rem] font-bold">
              <DatePicker
                selected={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                dateFormat="yyyy-MM-dd"
                className="m-[0] w-[11rem] bg-transparent"
              />
              <p className="mr-[1rem] w-[1rem]">-</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setendDate(date)}
                dateFormat="yyyy-MM-dd"
                className="w-[11rem] bg-transparent"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-[0.25rem] text-[1rem] font-bold text-eventoPurple">
              시간
            </div>
            <div className="mb-[2rem] h-[2rem] w-[24rem] text-[2rem] font-bold">
              2024-09-10 - 2024-09-10
            </div>
          </>
        )}

        {/* 일정 상세 */}
        {isComment ? (
          <div className="h-[10rem] overflow-auto">
            <div className="mb-[0.5rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">호선</div>
              <div className="mr-[1rem] rounded-[0.3rem] bg-lightGray px-[2rem] font-medium leading-[1.5rem]">
                저녁 머 먹지 ?
              </div>
              <AiOutlineLike size={20} />
            </div>
            <div className="mb-[0.5rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">채영</div>
              <div className="mr-[1rem] rounded-[0.3rem] bg-lightGray px-[2rem] font-medium leading-[1.5rem]">
                고기 어때
              </div>
              <AiOutlineLike size={20} />
            </div>
            <div className="mb-[0.5rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">수진</div>
              <div className="mr-[1rem] rounded-[0.3rem] bg-lightGray px-[2rem] font-medium leading-[1.5rem]">
                좋아
              </div>
              <AiOutlineLike size={20} />
            </div>
            <div className="mb-[0.5rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">호선</div>
              <div className="mr-[1rem] rounded-[0.3rem] bg-lightGray px-[2rem] font-medium leading-[1.5rem]">
                고기 ㄱㄱ
              </div>
              <AiOutlineLike size={20} />
            </div>
          </div>
        ) : isEdit ? (
          <>
            <div className="mb-[0.25rem] text-[1rem] font-bold text-eventoPurple">
              일정 상세
            </div>
            <input
              type="text"
              placeholder={`${detailEventMemo}`}
              className="mb-[2.5rem] h-[1.8rem] w-[40rem] bg-transparent text-[1.5rem] font-medium"
              onChange={(e) => {
                setDetailEventMemo(e.target.value);
              }}
            />
          </>
        ) : (
          <>
            <div className="mb-[0.25rem] text-[1rem] font-bold text-eventoPurple">
              일정 상세
            </div>
            <div className="mb-[4rem] h-[1.8rem] w-[40rem] text-[1.5rem] font-bold">
              {`${detailEventMemo}`}
            </div>
          </>
        )}

        {/* 기타 아이콘 */}
        {isComment ? (
          <input
            type="text"
            className="bottom relative mt-[0.7rem] h-[1.8rem] w-[37rem] rounded-[0.3rem] border-[0.1rem] border-darkGray bg-transparent"
          />
        ) : isEdit ? (
          <div className="flex flex-wrap justify-between">
            <div className="flex space-x-[0.5rem]">
              <p className="text-[1.2rem] font-medium leading-[3rem] text-eventoPurple">
                구독자에게 공개
              </p>
              {isEventPublic ? (
                <FaToggleOff
                  size={25}
                  className="mt-[0.7rem]"
                  onClick={toggleIsPublic}
                />
              ) : (
                <FaToggleOn
                  size={25}
                  className="mt-[0.7rem]"
                  onClick={toggleIsPublic}
                />
              )}
            </div>
            <div className="flex space-x-[0.5rem]">
              <button className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] border-[0.15rem] border-solid border-eventoPurple text-center text-[1.2rem] text-eventoPurple hover:bg-eventoPurpleLight/50 active:bg-eventoPurpleLight">
                <span>취소</span>
              </button>
              <button
                onClick={toggleIsEdit}
                className="flex h-[3rem] w-[5.5rem] items-center justify-center rounded-[0.5rem] bg-eventoPurple text-center text-[1.2rem] text-eventoWhite hover:bg-eventoPurple/80 active:bg-eventoPurple/60"
              >
                <span>저장</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex space-x-[0.5rem]">
              <FaCommentAlt size={25} onClick={toggleIsComment} />
              <div>
                {isLike ? (
                  <FaBookmark size={25} onClick={toggleIsLike} />
                ) : (
                  <FaRegBookmark size={25} onClick={toggleIsLike} />
                )}
              </div>
            </div>
            <div className="flex space-x-[0.5rem]">
              <FaRegTrashAlt size={25} />
              <FaPen size={25} onClick={toggleIsEdit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
