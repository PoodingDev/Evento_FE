module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "ui-sans-serif", "system-ui"],
      },
      screens: {
        xs: "380px",
      },
      colors: {
        // 주요 색상
        eventoPurple: "#8867DF", //기본 이벤토 색상
        eventoWhite: "#FCFCFA",

        // 보라색 색상들
        eventoPurpleLight: "#EADDFF",
        eventoPurpleBase: "#6750A4",
        eventoPurpleDark: "#4F378B",

        //캘린더 색상
        calendarRed: "#E05C5C",
        calendarYellow: "##FFC960",
        calendarGreen: "#7DBE7E",
        calendarLightBlue: "#9CC9FF",
        calendarBlue: "#6D87D5",
        calendarDarkPurple: "#8867DF",
        calendarPurple: "#B469D3",
        calendarPink: "#E67C93",
        calendarOrange: "#FFB866",
        calendarTeal: "#58C9C0",
        calendarIndigo: "#7B93D6",
        calendarBrown: "#A6856A",
        calendarOlive: "#9AB87A",
        calendarLavender: "#C7A8D9",
        

        // 경고 색상
        lightRed: "#FFCFCB",
        darkRed: "#E13228",

        eventoYellow: "#FFC960",

        darkGray: "#888888",
        lightGray: "#BBBBBB",

        eventoGray: "#F8F8F8",
        eventoblack: "#121212",
      },
    },
  },
  plugins: [],
};
