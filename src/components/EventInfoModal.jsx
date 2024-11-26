import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  FaLock,
  FaBookmark,
  FaRegTrashAlt,
  FaPen,
  FaCommentAlt,
  FaCaretDown,
  FaToggleOn,
  FaChevronLeft,
} from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

export default function EventInfo() {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [isComment, setIsComment] = useState(false);
  const toggleIsComment = () => setIsComment(!isComment);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[28rem] w-[48rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 이벤트 제목 */}
          {isEdit ? (
            <div className="flex">
              <div className="h-[3.8rem] pb-[1rem] text-[2.8rem] font-bold">
                저녁 약속
              </div>
              <div className="p-[0.3rem_25rem_0_1rem]">
                <FaLock size={25} />
              </div>
            </div>
          ) : (
            <input
              type="text"
              placeholder="일정을 입력하세요"
              className="h-[3.8rem] w-[30rem] bg-transparent pb-[1rem] text-[2.8rem] font-bold"
            />
          )}
          <FaXmark size={25} />
        </div>

        {/* 캘린더 제목 */}
        {isComment ? (
          isEdit ? (
            <div className="mb-[3.3rem] h-[1.5rem] w-[10rem] rounded-[3rem] bg-eventoYellow text-center text-[1.2rem] font-bold leading-[1.7rem]">
              Pooding팀
            </div>
          ) : (
            <div className="mb-[3.3rem] flex h-[1.5rem] w-[10rem] justify-center rounded-[3rem] bg-eventoYellow text-center text-[1.2rem] font-bold leading-[1.7rem]">
              <FaCaretDown size={25} />
              <p>Pooding팀</p>
            </div>
          )
        ) : (
          <div className="flex">
            <div className="mb-[2rem] h-[1.5rem] w-[10rem] rounded-[3rem] bg-eventoYellow text-center text-[1.2rem] font-bold leading-[1.7rem]">
              Pooding팀
            </div>
            <div className="ml-[1rem] text-[1.2rem] font-bold leading-[1.7rem]">
              고기 먹자!
            </div>
          </div>
        )}

        {/* 시간 */}
        {isComment ? (
          isEdit ? (
            <>
              <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
                시간
              </div>
              <div className="mb-[1.8rem] h-[2rem] w-[24rem] text-[2rem] font-medium">
                2024-09-10 - 2024-09-10
              </div>
            </>
          ) : (
            <>
              <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
                시간
              </div>
              <div className="mb-[1.8rem] flex h-[2rem] text-[2rem] font-medium">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
          )
        ) : (
          <div className="flex">
            <FaChevronLeft size={20} onClick={toggleIsComment} />
            <div className="mb-[1rem] ml-[0.5rem] font-medium leading-[1.3rem]">
              댓글
            </div>
          </div>
        )}

        {/* 일정 상세 */}
        {isComment ? (
          isEdit ? (
            isComment ? (
              <>
                <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
                  일정 상세
                </div>
                <div className="mb-[3.5rem] h-[1.8rem] w-[40rem] text-[1.5rem] font-medium">
                  고기 먹자!
                </div>
              </>
            ) : (
              <div></div>
            )
          ) : (
            <>
              <div className="mb-[0.5rem] text-[1rem] font-bold text-eventoPurple">
                일정 상세
              </div>
              <input
                type="text"
                placeholder="무슨 일정인가요?"
                className="mb-[3.5rem] h-[1.8rem] w-[40rem] bg-transparent text-[1.5rem] font-medium"
              />
            </>
          )
        ) : (
          <div className="h-[10rem] overflow-auto">
            <div className="mb-[1rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">호선</div>
              <div className="mr-[1rem] rounded-[0.5rem] bg-lightGray font-medium leading-[1.5rem]">
                저녁 머 먹지 ?
              </div>
              <AiOutlineLike size={20} />
            </div>
            <div className="mb-[1rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">채영</div>
              <div className="mr-[1rem] rounded-[0.5rem] bg-lightGray font-medium leading-[1.5rem]">
                고기 어때
              </div>
              <AiOutlineLike size={20} />
            </div>
            <div className="mb-[1rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">수진</div>
              <div className="mr-[1rem] rounded-[0.5rem] bg-lightGray font-medium leading-[1.5rem]">
                좋아
              </div>
              <AiOutlineLike size={20} />
            </div>
            <div className="mb-[1rem] flex flex-wrap">
              <div className="w-[42rem] font-medium">호선</div>
              <div className="mr-[1rem] rounded-[0.5rem] bg-lightGray font-medium leading-[1.5rem]">
                고기 ㄱㄱ
              </div>
              <AiOutlineLike size={20} />
            </div>
          </div>
        )}

        {/* 기타 아이콘 */}
        {isComment ? (
          isEdit ? (
            <div className="flex flex-wrap justify-between">
              <FaCommentAlt size={25} onClick={toggleIsComment} />
              <div className="pr-[32rem]">
                <FaBookmark size={25} />
              </div>
              <FaRegTrashAlt size={25} />
              <FaPen size={25} onClick={toggleIsEdit} />
            </div>
          ) : (
            <div className="flex flex-wrap justify-between">
              <p className="text-[1.2rem] font-medium text-eventoPurple">
                구독자에게 공개
              </p>
              <FaToggleOn size={25} />
              <div className="ml-[17rem] h-[3rem] w-[5.2rem] rounded-[0.5rem] border-[0.1rem] border-solid border-eventoPurple text-center text-[1.2rem] font-medium leading-[3rem] text-eventoPurple">
                취소
              </div>
              <div
                onClick={toggleIsEdit}
                className="h-[3rem] w-[5.2rem] rounded-[0.5rem] border-[0.1rem] border-solid bg-eventoPurple text-center text-[1.2rem] font-medium leading-[3rem] text-eventoWhite"
              >
                저장
              </div>
            </div>
          )
        ) : (
          <input
            type="text"
            className="bottom relative h-[1.8rem] w-[40rem] border-[0.1rem] border-darkGray bg-transparent"
          />
        )}
      </div>
    </div>
  );
}
