import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IoPersonCircleOutline, IoCalendarOutline } from "react-icons/io5"
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";


export default function ProfileEdit() {
    const location = useLocation();
    const { userName, userNickname, userEmail, userBirth } = location.state || {};
    const [newNickName, setNewNickName] = useState(userNickname)
    const [saveNickName, setSaveNickName] = useState('')
    const handleNickName = (e) => {
        setNewNickName(e.target.value);
    }
    const handleSave = () => {
        setSaveNickName(newNickName)
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex items-center gap-12 mb-6">
                    {/* 프로필 아이콘과 닉네임 입력 */}
                    <div className="flex flex-col items-center gap-3">
                        <IoPersonCircleOutline className="text-[#4F378B] w-[7.5rem] h-[7.5rem] object-cover" />
                        <input
                            type="text"
                            value={newNickName}
                            onChange={handleNickName}
                            className="border bg-[#F5F5F5] rounded px-3 py-2 w-[10rem] text-center"
                            placeholder="닉네임 수정"
                        />
                    </div>

                    {/* 사용자 정보 */}
                    <ul className="flex flex-col gap-4">
                        <li className="flex justify-between items-center w-[14rem]">
                            <span className="text-gray-600 font-semibold">이름</span>
                            <span className="text-gray-800">{userName}</span>
                        </li>
                        <li className="flex justify-between items-center w-[14rem]">
                            <span className="text-gray-600 font-semibold">이메일</span>
                            <span className="text-gray-800">{userEmail}</span>
                        </li>
                        <li className="flex justify-between items-center w-[14rem]">
                            <span className="text-gray-600 font-semibold">내 생일</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-800">{userBirth}</span>
                                <IoCalendarOutline className="text-gray-600" />
                            </div>
                        </li>
                        <li className="flex justify-between items-center w-[14rem]">
                            <span className="text-gray-600 font-semibold">공개</span>
                            <span><FaToggleOn className="text-[#6750A4] text-[18px]" /></span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-center items-center gap-4 absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <button className="w-[7rem] gap-3 rounded-[0.625rem] py-2 px-3 bg-white text-[#8867DF] border-2 border-[#8867DF]">
                    취소
                </button>
                <button onClick={handleSave} className="w-[7rem] gap-3 rounded-[0.625rem] py-2 px-3 bg-[#8867DF] text-white">
                    저장
                </button>
            </div>
        </>
    )
};