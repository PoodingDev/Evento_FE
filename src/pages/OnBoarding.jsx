import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([
    {
      show: true,
      img: "/assets/evento_logo.png",
      title: "간편한 일정 관리,",
      body: "evento.와 함께 시작하세요",
    },
    {
      show: false,
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento1",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 토이벤토",
    },
    {
      show: false,
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento2",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 토이벤토",
    },
    {
      show: false,
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento3",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 토이벤토",
    },
    {
      show: false,
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento4",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 토이벤토",
    },
    {
      show: false,
      img: "/assets/onboarding/editCalendar.png",
      title: "Evento5",
      body: "이벤토이 이벤토이 벤토설이벤토 설명설 명설 명이벤 토이벤토",
    },
    {
      show: false,
      img: "/assets/evento_logo.png",
      title: "지금 바로 시작하세요",
      body: "",
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const newSlides = slides.map((slide, index) => ({
      ...slide,
      show: index === currentIndex,
    }));
    setSlides(newSlides);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, slides.length - 1),
        );
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [slides.length]);

  const handleSwipe = () => {
    const diffX = touchStart.x - touchEnd.x;

    if (Math.abs(diffX) > 20) {
      if (diffX > 0) {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, slides.length - 1),
        );
      } else {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-eventoPurple/40 px-5 py-5">
      <div className="mx-auto w-[40%] rounded-3xl px-10 pb-10 pt-16 text-eventoWhite">
        {/* Carousel */}
        <div className="relative mb-10 overflow-hidden">
          <div
            className="relative cursor-grab"
            onTouchStart={(e) =>
              setTouchStart({
                x: e.touches[0].screenX,
                y: e.touches[0].screenY,
              })
            }
            onTouchEnd={(e) => {
              setTouchEnd({
                x: e.changedTouches[0].screenX,
                y: e.changedTouches[0].screenY,
              });
              handleSwipe();
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`w-full text-center ${
                  slide.show ? "block" : "hidden"
                }`}
              >
                <div
                  className="b-10 mx-auto h-72 w-72 border bg-center"
                  style={{
                    backgroundImage: `url(${slide.img})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>

                <h2 className="mb-3 text-2xl font-bold text-eventoPurpleDark">
                  {slide.title}
                </h2>
                <p className="h-16 text-[1.2rem] font-medium leading-tight text-eventoWhite">
                  {slide.body}
                </p>

                {/* Get Started Button */}
                {index === slides.length - 1 && (
                  <button
                    onClick={() => navigate("/login")}
                    className="mt-6 rounded-lg bg-eventoPurpleDark px-6 py-3 text-eventoWhite shadow hover:bg-eventoPurpleLight hover:text-eventoPurpleDark focus:outline-none active:bg-eventoPurple active:text-eventoWhite"
                  >
                    Get Started
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`mx-1 h-2 w-2 cursor-pointer rounded-full ${
                index === currentIndex
                  ? "bg-eventoWhite"
                  : "bg-eventoPurpleLight"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
