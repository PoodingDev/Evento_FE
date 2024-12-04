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
      img: "/assets/onboarding/main_calendar.png",
      title: "Evento1",
      body: (
        <>
          선택한 캘린더만 표시되고, 지정된 색상으로 구분되어
          <br />
          한눈에 쉽게 확인할 수 있는 맞춤형 캘린더 서비스입니다! 💖
        </>
      ),
    },
    {
      img: "/assets/onboarding/subscription_search.png",
      title: "Evento2",
      body: (
        <>
          좋아하는 아티스트를 검색해 캘린더를 구독하고,
          <br />
          구독한 캘린더를 한눈에 확인할 수 있어요!
        </>
      ),
    },
    {
      img: "/assets/onboarding/subscription_list.png",
      title: "Evento3",
      body: (
        <>
          원하는 캘린더를 선택해,
          <br />
          필요한 일정만 한눈에 확인할 수 있는 페이지입니다!
        </>
      ),
    },
    {
      img: "/assets/onboarding/comment_like.png",
      title: "Evento4",
      body: (
        <>
          상세 일정을 클릭해 의견을 나누고,
          <br />
          '좋아요'를 눌러보세요!
        </>
      ),
    },
    {
      img: "/assets/onboarding/d_day.png",
      title: "Evento5",
      body: (
        <>
          중요한 일정은 D-DAY로 표시되어,
          <br />
          이벤트까지 남은 일수를 한눈에 확인할 수 있습니다.
        </>
      ),
    },
    {
      img: "/assets/onboarding/create_calendar.png",
      title: "Evento6",
      body: (
        <>
          색상을 변경하고, 공개/비공개 설정으로 검색 여부를 조정할 수 있어요.
          <br />
          친구를 초대해 함께 캘린더를 관리할 수 있습니다!
        </>
      ),
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
      <div className="relative mx-10 w-[40%] overflow-hidden rounded-3xl pb-10 pt-16 text-gray-800">
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
              {/* 이미지 렌더링 */}
              <img
                src={slide.img}
                alt={slide.title}
                className="mb-5 h-[100px] w-auto object-contain"
              />
              <h2 className="mb-3 text-[1.3rem] font-bold text-eventoPurpleDark">
                {slide.title}
              </h2>
              <p className="h-16 text-[1.1rem] font-semibold leading-tight text-eventoPurple/80">
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
              className={`mx-1 h-3 w-3 cursor-pointer rounded-full ${
                index === currentIndex ? "bg-eventoPurple" : "bg-gray-300"
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
