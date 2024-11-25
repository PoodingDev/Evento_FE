import React, { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FaPen, FaCopy, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CalendarInfo() {
  //수정 및 편집
  const [isEdit, setIsEdit] = useState(true);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //공개
  const [isPublic, setIsPublic] = useState(false);
  const toggleIsPublic = () => setIsPublic(!isPublic);

  //상세
  const [detailMemo, setDetailMemo] = useState("푸우가 코딩한다");

  // 색상
  const [calColor, setCalColor] = useState("calendarRed");

  //초대코드
  const [visitCode, setVisitCode] = useState("GW5F4");

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      {console.log(calColor)}
      {console.log(isEdit)}
      <div className="h-[28rem] w-[48rem] rounded-[2.5rem] bg-eventoWhite p-[2.8rem] shadow-[0_0_2.5rem_gray]">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          {isEdit ? (
            <div
              className={`mb-[2rem] text-[3rem] font-black text-${calColor}`}
            >
              Pooding팀
            </div>
          ) : (
            <div className="mb-[2rem] text-[3rem] font-black text-lightGray">
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
              {`${detailMemo}`}
            </div>
            <div className={`h-[1.5rem] w-[1.5rem] bg-${calColor}`}></div>
          </div>
        ) : (
          <div className="flex">
            <input
              type="text"
              placeholder={`${detailMemo}`}
              className="mb-[3rem] mr-[2rem] h-[1.3rem] w-[18rem] border-b-[0.1rem] border-solid border-eventoPurple text-[1.2rem] font-bold"
              onChange={(e) => {
                setDetailMemo(e.target.value);
              }}
            />
            <div className="mb-[1.5rem] flex h-[4.8rem] w-[10.6rem] flex-wrap items-center rounded-[0.2rem] bg-lightGray p-[0.5rem]">
              <button
                onClick={() => setCalColor("calendarYellow")}
                className={
                  calColor === "calendarYellow"
                    ? "mr-[0.5rem] h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarYellow"
                    : "mr-[0.5rem] h-[1.5rem] w-[1.5rem] bg-calendarYellow"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarRed")}
                className={
                  calColor === "calendarRed"
                    ? "mr-[0.5rem] h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarRed"
                    : "mr-[0.5rem] h-[1.5rem] w-[1.5rem] bg-calendarRed"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarGreen")}
                className={
                  calColor === "calendarGreen"
                    ? "mr-[0.5rem] h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarGreen"
                    : "mr-[0.5rem] h-[1.5rem] w-[1.5rem] bg-calendarGreen"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarLightBlue")}
                className={
                  calColor === "calendarLightBlue"
                    ? "mr-[0.5rem] h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarLightBlue"
                    : "mr-[0.5rem] h-[1.5rem] w-[1.5rem] bg-calendarLightBlue"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarDarkPurple")}
                className={
                  calColor === "calendarDarkPurple"
                    ? "h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarDarkPurple"
                    : "h-[1.5rem] w-[1.5rem] bg-calendarDarkPurple"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarBlue")}
                className={
                  calColor === "calendarBlue"
                    ? "mr-[0.5rem] h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarBlue"
                    : "mr-[0.5rem] h-[1.5rem] w-[1.5rem] bg-calendarBlue"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarPurple")}
                className={
                  calColor === "calendarPurple"
                    ? "mr-[0.5rem] h-[1.5rem] w-[1.5rem] border-[0.1rem] border-darkGray bg-calendarPurple"
                    : "mr-[0.5rem] h-[1.5rem] w-[1.5rem] bg-calendarPurple"
                }
              ></button>
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
              <div className="w-[20rem] text-[1.2rem] font-bold">
                {isPublic ? "공개" : "비공개"}
              </div>
              <div className="pb-[0.8rem] pr-[0.5rem] text-[1.2rem] font-bold">
                {`${visitCode}`}
              </div>
              <CopyToClipboard text={`${visitCode}`}>
                <FaCopy />
              </CopyToClipboard>
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
              {isPublic ? (
                <FaToggleOff className="mr-[6rem]" onClick={toggleIsPublic} />
              ) : (
                <FaToggleOn className="mr-[6rem]" onClick={toggleIsPublic} />
              )}
              <div className="pb-[0.8rem] text-[1.2rem] font-bold">GW5F4</div>
              <div className="ml-[8rem] mr-[0.1rem] h-[2.5rem] w-[4.5rem] rounded-[0.5rem] border-[0.1rem] border-solid border-eventoPurple text-center text-[1.2rem] font-medium leading-[2.5rem] text-eventoPurple">
                취소
              </div>
              <div
                onClick={toggleIsEdit}
                className="h-[2.5rem] w-[4.5rem] rounded-[0.5rem] bg-eventoPurple text-center text-[1.2rem] font-medium leading-[2.5rem] text-eventoWhite"
              >
                저장
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
