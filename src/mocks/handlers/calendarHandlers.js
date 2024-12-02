import { rest } from "msw";

// 기존의 캘린더 데이터 (가짜 데이터)
let mockCalendars = [
  {
    calendar_id: 1,
    calendar_name: "PoodingDev",
    calendar_description: "개발 프로젝트 캘린더",
    calendar_color: "#4685FF", // 색상 코드
    is_public: false,
    creator_id: 1,
    invitation_code: "ABC123",
  },
  {
    calendar_id: 2,
    calendar_name: "캘린이의 삶",
    calendar_description: "학습 및 생활 관리 캘린더",
    calendar_color: "#F69292", // 색상 코드
    is_public: true,
    creator_id: 2,
    invitation_code: "XYZ789",
  },
];

export const calendarHandlers = [
  // 캘린더 리스트 가져오기 핸들러
  rest.get("/api/calendars", (req, res, ctx) => {
    const token = req.headers.get("Authorization");

    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요합니다. 다시 로그인해 주세요.",
        }),
      );
    }

    return res(ctx.status(200), ctx.json(mockCalendars));
  }),

  // 캘린더 생성 핸들러
  rest.post("/api/calendars", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { calendar_name, calendar_description, calendar_color, is_public } =
      await req.json();

    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요한 서비스입니다. 다시 로그인해 주세요.",
        }),
      );
    }

    // 새 캘린더 생성
    const calendar_id = mockCalendars.length + 1;
    const newCalendar = {
      calendar_id,
      calendar_name,
      calendar_description: calendar_description || "",
      calendar_color: calendar_color, // 클라이언트에서 전달된 색상 값 사용
      is_public: is_public || false,
      creator_id: 1,
      invitation_code: "ABC123", // 생성된 초대 코드 (고정된 가짜 코드)
    };

    // 가짜 데이터 목록에 새 캘린더 추가
    mockCalendars.push(newCalendar);

    // 201 Created 응답 반환
    return res(ctx.status(201), ctx.json(newCalendar));
  }),
];
