import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy, FaPen, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function CalendarInfo() {
  //수정 및 편집
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //공개
  const [isPublic, setIsPublic] = useState(false);
  const toggleIsPublic = () => setIsPublic(!isPublic);

  //상세
  const [detailMemo, setDetailMemo] = useState("푸우가 코딩한다");

  // 색상
  const [calColor, setCalColor] = useState("calendarRed");
  const [textColor, setTextColor] = useState("");
  useEffect(() => {
    if (calColor === "calendarYellow") {
      setTextColor("text-calendarYellow");
    } else if (calColor === "calendarRed") {
      setTextColor("text-calendarRed");
    } else if (calColor === "calendarGreen") {
      setTextColor("text-calendarGreen");
    } else if (calColor === "calendarLightBlue") {
      setTextColor("text-calendarLightBlue");
    } else if (calColor === "calendarDarkPurple") {
      setTextColor("text-calendarDarkPurple");
    } else if (calColor === "calendarBlue") {
      setTextColor("text-calendarBlue");
    } else if (calColor === "calendarPurple") {
      setTextColor("text-calendarPurple");
    }
  }, [calColor]);

  //초대코드
  const [visitCode, setVisitCode] = useState("GW5F4");

  return (
    <div className="ml-[18rem] flex h-screen items-center justify-center pt-[5rem]">
      <div className="h-[29rem] w-[43rem] rounded-[1.25rem] bg-eventoWhite p-[2.8rem] shadow-xl shadow-lightGray/50">
        <div className="flex flex-wrap justify-between">
          {/* 제목 */}
          {isEdit ? (
            <div className="mb-[1.75rem] text-[4rem] font-bold text-lightGray">
              Pooding팀
            </div>
          ) : (
            <div className={`mb-[1.75rem] text-[4rem] font-bold ${textColor}`}>
              Pooding팀
            </div>
          )}
          <FaXmark size={25} />
        </div>

        {/* 멤버 */}
        <div className="mb-[0.75rem] text-[1rem] font-bold text-eventoPurple">
          멤버
        </div>
        <div className="mb-[2.8rem] w-[40rem] text-[1.25rem] font-bold">
          호도니, 뚜디니, 때용이 + 10
        </div>

        {/* 일정 상세 */}
        <div className="flex">
          <div className="mb-[0.75rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 상세
          </div>
          <div className="mb-[0.8rem] text-[1rem] font-bold text-eventoPurple">
            색상
          </div>
        </div>
        {isEdit ? (
          <div className="flex">
            <input
              type="text"
              placeholder={`${detailMemo}`}
              className="mb-[3rem] mr-[2rem] h-[1.3rem] w-[18rem] border-b-[0.1rem] border-solid border-eventoPurple bg-transparent text-[1.2rem] font-bold"
              onChange={(e) => {
                setDetailMemo(e.target.value);
              }}
            />
            <div className="flex h-[2rem] w-[10rem] items-center rounded-[0.2rem] bg-lightGray p-[0.5rem]">
              <button
                onClick={() => setCalColor("calendarYellow")}
                className={
                  calColor === "calendarYellow"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarYellow"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarYellow"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarRed")}
                className={
                  calColor === "calendarRed"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarRed"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarRed"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarGreen")}
                className={
                  calColor === "calendarGreen"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarGreen"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarGreen"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarLightBlue")}
                className={
                  calColor === "calendarLightBlue"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarLightBlue"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarLightBlue"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarDarkPurple")}
                className={
                  calColor === "calendarDarkPurple"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarDarkPurple"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarDarkPurple"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarBlue")}
                className={
                  calColor === "calendarBlue"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarBlue"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarBlue"
                }
              ></button>
              <button
                onClick={() => setCalColor("calendarPurple")}
                className={
                  calColor === "calendarPurple"
                    ? "mr-[0.3rem] h-[1rem] w-[1rem] border-[0.1rem] border-darkGray bg-calendarPurple"
                    : "mr-[0.3rem] h-[1rem] w-[1rem] bg-calendarPurple"
                }
              ></button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="mb-[3rem] h-[1.3rem] w-[20rem] text-[1.25rem] font-bold">
              {`${detailMemo}`}
            </div>
            <div className={`h-[1.38rem] w-[1.5rem] bg-${calColor}`}></div>
          </div>
        )}

        {/* 공개 여부 */}
        <div className="flex">
          <div className="mb-[0.7rem] w-[20rem] text-[1rem] font-bold text-eventoPurple">
            캘린더 공개 여부
          </div>
          <div className="mb-[0.7rem] text-[1rem] font-bold text-eventoPurple">
            초대 코드
          </div>
        </div>
        {isEdit ? (
          <>
            <div className="flex">
              <div className="w-[13rem] text-[1.25rem] font-bold">
                비공개 캘린더로 설정하기
              </div>
              {isPublic ? (
                <FaToggleOff className="mr-[6rem]" onClick={toggleIsPublic} />
              ) : (
                <FaToggleOn className="mr-[6rem]" onClick={toggleIsPublic} />
              )}
              <div className="text-[1.25rem] font-bold">GW5F4</div>
            </div>
            <div className="flex justify-end space-x-[0.5rem]">
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
          </>
        ) : (
          <>
            <div className="flex">
              <div className="w-[20rem] text-[1.25rem] font-bold">
                {isPublic ? "공개" : "비공개"}
              </div>
              <div className="pr-[0.5rem] text-[1.25rem] font-bold">
                {`${visitCode}`}
              </div>
              <CopyToClipboard text={`${visitCode}`}>
                <FaCopy />
              </CopyToClipboard>
            </div>
            <div className="flex justify-end">
              <FaPen size={25} onClick={toggleIsEdit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
