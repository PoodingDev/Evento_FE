import React from 'react'
import { IoChevronBack, IoPersonCircleOutline, IoSearch } from 'react-icons/io5'
import { Link } from 'react-router-dom'

//더미데이터 
const openCalendars = [
  { id: "100", calendarName: "therock", userNickNam: "Dwayne Johnson" },
  { id: "101", calendarName: "bts.bighitofficial", userNickNam: "BTS" },
  { id: "102", calendarName: "IU", userNickNam: "dlwlrma" },
  { id: "103", calendarName: "xxxibgdrgn", userNickNam: "G-DRAGON" },
  { id: "104", calendarName: "songkang_b", userNickNam: "송강" },
  { id: "105", calendarName: "캘린더이름", userNickNam: "생성자닉네임" },
];

export default function Subscription() {

  return (
    <div className=" h-[100vh] pl-[18rem] pt-[5rem] flex-col">
      <div className="ml-[5rem] mt-[2rem] flex items-center text-center">
        <Link to="/">
          <IoChevronBack className="text-[1.4rem]" />
        </Link>
        <p className="text-[1.4rem]">&nbsp; 공개 캘린더</p>
      </div>
      <div className='flex w-full'>
        <CaleanderSearch />
        <SubsciptionCaleander />
      </div>
    </div >
  )
}

function CaleanderSearch() {
  return (
    <>
      <section className='flex justify-center align-middle  items-center w-2/3 flex-col py-[3rem]'>
        <div className='flex items-center gap-2'>
          <input type="text" className=' focus:border-eventoPurple/80 focus:bg-eventoPurpleLight/80 focus: rounded-2xl bg-gray-200 p-[2px] px-3 py-2 text-center focus:border-[1px] focus:outline-none' />
          <IoSearch className='text-[2rem]' />
        </div>
        <ul className='w-auto flex flex-col my-[2rem]'>

          {openCalendars.map((calendar) => (
            <li key={calendar.id} className="flex items-center gap-[1rem] w-[20rem] my-2 ">
              <IoPersonCircleOutline className="w-[3.5rem] h-[3.5rem] object-cover" />
              <div >
                <h3 className='text-[#493282]'>{calendar.calendarName}</h3>
                <p className='text-[#646464]'>{calendar.userNickNam}</p>
              </div>
              <button className=' w-[5rem] ml-auto h-[2rem]  align-middle p-1 rounded-[0.625rem] bg-[#E13228] text-[#fff] border-2 border-[#E13228]'>구독</button>
            </li>
          ))}</ul>
      </section >
    </>
  )
}

function SubsciptionCaleander() {
  return (
    <>
      <div className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:w-[2px] after:bg-gray-200">
      </div>
      <section className='  flex justify-center items-center w-1/3 flex-col '>
        <h1>구독한 캘린더</h1>

        <ul className='w-auto flex flex-col'>{openCalendars.map((calendar) => (<li key={calendar.id} className="flex gap-[1rem] items-center my-2 ">
          <IoPersonCircleOutline className="w-[3.5rem] h-[3.5rem] object-cover" />
          <div >
            <h3 className='text-[#493282]'>{calendar.calendarName}</h3>
            <p className='text-[#646464]'>{calendar.userNickNam}</p>
          </div>
          <button className='  w-[5rem] ml-auto h-[2rem]  align-middle p-1 rounded-[0.625rem]  bg-white text-[#E13228] border-2 border-[#E13228]'>구독취소</button>
        </li>))}</ul>
      </section>
    </>
  )
}