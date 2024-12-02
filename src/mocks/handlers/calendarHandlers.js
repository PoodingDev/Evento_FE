import { rest } from "msw";

let mockCalendars = [
  {
    calendar_id: 1,
    calendar_name: "내가 만든 캘린더 test",
    calendar_description: "삭제 권한 있어야 함",
    calendar_color: "#FFC960",
    is_public: false,
    creator_id: 1,
    invitation_code: "GW3HR4",
  },
  {
    calendar_id: 2,
    calendar_name: "관리자로 있는 캘린더 test",
    calendar_description: "삭제 권한 없어야 함",
    calendar_color: "#6D87D5",
    is_public: true,
    creator_id: 2,
    invitation_code: "G3G7H3",
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
      invitation_code: "ABC123", // 생성된 초대 코드
    };

    // 가짜 데이터 목록에 새 캘린더 추가
    mockCalendars.push(newCalendar);

    // 201 Created 응답 반환
    return res(ctx.status(201), ctx.json(newCalendar));
  }),

  // 캘린더 수정 핸들러
  rest.patch("/api/calendars/:calendarId", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { calendarId } = req.params;
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

    // 가짜 데이터에서 해당 캘린더를 찾음
    const calendarIndex = mockCalendars.findIndex(
      (cal) => cal.calendar_id === parseInt(calendarId),
    );

    if (calendarIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: "not_found",
          message: "해당 캘린더를 찾을 수 없습니다.",
        }),
      );
    }

    // 캘린더 데이터 업데이트
    mockCalendars[calendarIndex] = {
      ...mockCalendars[calendarIndex],
      calendar_name:
        calendar_name || mockCalendars[calendarIndex].calendar_name,
      calendar_description:
        calendar_description ||
        mockCalendars[calendarIndex].calendar_description,
      calendar_color:
        calendar_color || mockCalendars[calendarIndex].calendar_color,
      is_public:
        typeof is_public === "boolean"
          ? is_public
          : mockCalendars[calendarIndex].is_public,
    };

    // 200 OK 응답 반환
    return res(ctx.status(200), ctx.json(mockCalendars[calendarIndex]));
  }),

  // 캘린더 삭제 핸들러 추가
  rest.delete("/api/calendars/:calendarId", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { calendarId } = req.params;

    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요합니다. 다시 로그인해 주세요.",
        }),
      );
    }

    // 가짜 데이터에서 해당 캘린더를 찾음
    const calendarIndex = mockCalendars.findIndex(
      (cal) => cal.calendar_id === parseInt(calendarId),
    );

    if (calendarIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: "not_found",
          message: "해당 캘린더를 찾을 수 없습니다.",
        }),
      );
    }

    // 캘린더 삭제
    mockCalendars.splice(calendarIndex, 1);

    // 200 OK 응답 반환
    return res(
      ctx.status(200),
      ctx.json({ message: "캘린더가 성공적으로 삭제되었습니다." }),
    );
  }),
];
