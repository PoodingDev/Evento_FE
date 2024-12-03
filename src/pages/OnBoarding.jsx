import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const navigate = useNavigate();
  const [slides] = useState([
    {
      img: "/assets/evento_logo.png",
      title: "간편한 일정 관리,",
      body: "evento.와 함께 시작하세요",
    },
    {
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento1",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 ",
    },
    {
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento2",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 ",
    },
    {
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento3",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 ",
    },
    {
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento4",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 ",
    },
    {
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento5",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 ",
    },
    {
      img: "/assets/evento_logo.png",
      title: "",
      body: "지금 바로 시작하세요",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "next") {
      setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    } else if (direction === "prev") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-eventoWhite px-5 py-5">
      {/* <div className="relative mx-auto w-[40%] overflow-hidden rounded-3xl bg-white px-10 pb-10 pt-16 text-gray-800 shadow-lg">
       */}
      <div className="relative w-[40%] overflow-hidden rounded-3xl mx-10 pb-10 pt-16 text-gray-800">
        {/* 슬라이드 컨테이너 */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex w-full flex-shrink-0 flex-col items-center text-center"
              style={{ width: "100%" }}
            >
              <div
                className="mb-5 h-64 w-64 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.img})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <h2 className="mb-3 text-2xl font-bold text-eventoPurpleDark">
                {slide.title}
              </h2>
              <p className="h-16 text-[1.2rem] font-semibold leading-tight text-eventoPurple/80">
                {slide.body}
              </p>
              {index === slides.length - 1 && (
                <button
                  onClick={() => navigate("/login")}
                  className="mb-4 rounded-lg bg-eventoPurpleDark px-6 py-3 text-white shadow hover:bg-eventoPurple focus:outline-none active:bg-eventoWhite active:text-eventoPurpleDark"
                >
                  Get Started
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${index === currentIndex ? "bg-eventoPurple" : "bg-gray-300"
                }`}
            ></span>
          ))}
        </div>

        {/* 네비게이션 */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 transform">
          <button
            onClick={() => handleSwipe("prev")}
            className="h-10 w-10 rounded-full bg-eventoPurpleLight/30 text-eventoPurple hover:bg-gray-300"
          >
            {"<"}
          </button>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
          <button
            onClick={() => handleSwipe("next")}
            className="h-10 w-10 rounded-full bg-eventoPurpleLight/30 text-eventoPurple hover:bg-gray-300"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
