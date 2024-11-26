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
        calendarYellow: "#FFE55C",
        calendarRed: "#F69292",
        calendarGreen: "#95DEA1",
        calendarLightBlue: "#9CC9FF",
        calendarDarkPurple: "#B89BCE",
        calendarBlue: "#95A9F0",
        calendarPurple: "#DE95F0",

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
