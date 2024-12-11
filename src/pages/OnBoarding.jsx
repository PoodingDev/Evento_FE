import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const navigate = useNavigate(); // ✅ 컴포넌트 내부로 이동
  const [slides] = useState([
    {
      img: "/assets/evento_logo.png",
      title: "간편한 일정 관리,",
      body: (
        <>
          <br />
          evento와 함께 새로운 경험을 시작하세요
        </>
      ),
    },
    {
      img: "/assets/onboarding/main_calendar.png",
      title: "깔끔한 캘린더 분류",
      body: (
        <>
          색상별로 일정을 구분하여
          <br />
          한눈에 보기 쉽게 정리해보세요.
        </>
      ),
    },
    {
      img: "/assets/onboarding/filtering.png",
      title: "맞춤형 일정 필터링",
      body: (
        <>
          내가 필요한 일정만 선택해서
          <br />
          효율적으로 관리하세요.
        </>
      ),
    },
    {
      img: "/assets/onboarding/subscription_search.png",
      title: "스마트한 덕질",
      body: (
        <>
          좋아하는 아티스트의 공식 스케줄을
          <br />
          구독하고 한곳에서 확인하세요.
        </>
      ),
    },
    {
      img: "/assets/onboarding/comment_like.png",
      title: "함께하는 일정 계획",
      body: (
        <>
          일정별 채팅창을 통해
          <br />
          친구들과 소통하며 계획을 세워보세요.
        </>
      ),
    },
    {
      img: "/assets/onboarding/d_day.png",
      title: "특별한 날은 D-Day로",
      body: (
        <>
          중요한 날을 D-Day로 설정하고
          <br />
          남은 날짜를 쉽게 확인하세요.
        </>
      ),
    },
    {
      img: "/assets/onboarding/create_calendar.png",
      title: "우리만의 캘린더",
      body: <>비공개 설정 기능을 통해 나와 친구들만의 캘린더를 완성하세요.</>,
    },
    {
      img: "/assets/evento_logo.png",
      title: "",
      // body: "지금 바로 시작하세요!",
      body: "현재 서버가 종료되었습니다.",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // 토큰 체크 및 리다이렉션
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/calendar"); // 토큰이 있으면 캘린더로 리다이렉션
    }
  }, [navigate]);

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
    <div className="flex items-center justify-center min-h-screen px-5 py-5 bg-eventoWhite">
      <div className="relative mx-10 w-[60%] overflow-hidden rounded-3xl pb-10 pt-16 text-gray-800">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center flex-shrink-0 w-full text-center"
              style={{ width: "100%" }}
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="object-contain w-auto mb-5"
                style={{
                  height:
                    index === 0 || index === slides.length - 1
                      ? "100px"
                      : "250px",
                }}
              />
              <h2
                className={`text-[1.3rem] font-semibold text-eventoPurpleDark/90 ${
                  index === 0 ? "mt-20" : "mb-3"
                }`}
              >
                {slide.title}
              </h2>
              <p className="h-16 text-[1rem] leading-tight text-eventoPurple/80">
                {slide.body}
              </p>
              {index === slides.length - 1 && (
                <>
                  <p className="mb-4 text-[1.2rem] font-bold text-red-500">
                    현재 서버가 종료되었습니다.
                  </p>
                  <button
                    disabled
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 mb-4 text-white transition-transform duration-300 ease-in-out rounded-full shadow-lg rounded- bg-eventoPurpleDark hover:scale-105 hover:bg-eventoPurple hover:shadow-2xl focus:outline-none active:scale-95 active:bg-eventoWhite active:text-eventoPurpleDark"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
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

        <div className="absolute transform -translate-y-1/2 left-2 top-1/2">
          <button
            onClick={() => handleSwipe("prev")}
            className="w-10 h-10 rounded-full bg-eventoPurpleLight/30 text-eventoPurple hover:bg-gray-300"
          >
            {"<"}
          </button>
        </div>
        <div className="absolute transform -translate-y-1/2 right-1 top-1/2">
          <button
            onClick={() => handleSwipe("next")}
            className="w-10 h-10 rounded-full bg-eventoPurpleLight/30 text-eventoPurple hover:bg-gray-300"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
