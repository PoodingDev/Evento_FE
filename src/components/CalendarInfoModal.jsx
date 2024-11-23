import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPen, FaCopy, FaToggleOn } from "react-icons/fa";

export default function CalendarInfo() {
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[28rem] w-[48rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          {isEdit ? (
            <div className="text-calendarYellow mb-[2rem] text-[3rem] font-black">
              Pooding팀
            </div>
          ) : (
            <div className="text-lightGray mb-[2rem] text-[3rem] font-black">
              Pooding팀
            </div>
          )}
          <FaXmark size={25} />
        </div>

        {/* 멤버 */}
        <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
          멤버
        </div>
        <div className="mb-[2rem] w-[40rem] text-[1.2rem] font-bold">
          호도니, 뚜디니, 때용이 + 10
        </div>

        {/* 일정 상세 */}
        <div className="flex">
          <div className="mb-[0.8rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 상세
          </div>
          <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
            색상
          </div>
        </div>
        {isEdit ? (
          <div className="flex">
            <div className="mb-[3rem] h-[1.3rem] w-[20rem] text-[1.2rem] font-bold">
              푸우가 코딩한다
            </div>
            <div className="bg-calendarYellow h-[1.5rem] w-[1.5rem]"></div>
          </div>
        ) : (
          <div className="flex">
            <input
              type="text"
              placeholder="푸우가 코딩한다"
              className="mb-[3rem] mr-[2rem] h-[1.3rem] w-[18rem] border-b-[0.1rem] border-solid border-eventoPurple text-[1.2rem] font-bold"
            />
            <div className="bg-lightGray mb-[1.5rem] flex h-[4.8rem] w-[10.5rem] flex-wrap items-center rounded-[0.2rem] p-[0.5rem]">
              <div className="bg-calendarYellow mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
              <div className="bg-calendarRed mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
              <div className="bg-calendarGreen mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
              <div className="bg-calendarLightBlue mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
              <div className="bg-calendarDarkPurple h-[1.5rem] w-[1.5rem]"></div>
              <div className="bg-calendarBlue mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
              <div className="bg-calendarPurple mr-[0.5rem] h-[1.5rem] w-[1.5rem]"></div>
            </div>
          </div>
        )}

        {/* 공개 여부 */}
        <div className="flex">
          <div className="mb-[0.8rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 공개 여부
          </div>
          <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
            초대 코드
          </div>
        </div>
        {isEdit ? (
          <>
            <div className="flex">
              <div className="w-[20rem] text-[1.2rem] font-bold">비공개</div>
              <div className="pb-[0.8rem] pr-[0.5rem] text-[1.2rem] font-bold">
                GW5F4
              </div>
              <FaCopy />
            </div>
            <div className="ml-[40.5rem]">
              <FaPen size={25} onClick={toggleIsEdit} />
            </div>
          </>
        ) : (
          <>
            <div className="flex">
              <div className="w-[13rem] text-[1.2rem] font-bold">
                비공개 캘린더로 설정하기
              </div>
              <FaToggleOn className="mr-[6rem]" />
              <div className="pb-[0.8rem] text-[1.2rem] font-bold">GW5F4</div>
              <FaPen
                size={25}
                onClick={toggleIsEdit}
                className="ml-[16.68rem]"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
