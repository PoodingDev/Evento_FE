import { rest } from "msw";

let mockEventData = [
  {
    allDay: true,
    event_id: 1,
    event_title: "저녁 약속",
    cal_title: "Creator test",
    cal_color: "#FFC960",
    start_time: new Date("2024-12-01"),
    end_time: new Date("2024-12-05"),
    event_description: "고기 먹자",
    is_public: false,
  },
];

export const eventHandlers = [
  // 이벤트 리스트 가져오기 핸들러
  rest.get("/api/calendars/:calendar_id/events", (req, res, ctx) => {
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

    return res(ctx.status(200), ctx.json(mockEventData));
  }),

  // 이벤트 생성 핸들러
  rest.post("/api/calendars/:calendar_id/events", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const {
      event_title,
      cal_title,
      cal_color,
      start_time,
      end_time,
      event_description,
      is_public,
    } = await req.json();

    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요한 서비스입니다. 다시 로그인해 주세요.",
        }),
      );
    }

    // 새 이벤트 생성
    const event_id = mockEventData.length + 1;
    const newEvent = {
      event_id,
      event_title,
      cal_title,
      cal_color,
      start_time,
      end_time,
      event_description: event_description || "",
      is_public: is_public || false,
    };

    // 가짜 데이터 목록에 새 캘린더 추가
    mockEventData.push(newEvent);

    // 201 Created 응답 반환
    return res(ctx.status(201), ctx.json(newEvent));
  }),

  //이벤트 수정 핸들러
  rest.patch(
    "/api/calendars/:calendar_id/events/:eventId",
    async (req, res, ctx) => {
      const token = req.headers.get("Authorization");
      const { eventId } = req.params;
      const {
        event_title,
        cal_title,
        cal_color,
        start_time,
        end_time,
        event_description,
        is_public,
      } = await req.json();

      if (!token || token !== "Bearer fake_token") {
        return res(
          ctx.status(401),
          ctx.json({
            error: "인증 실패",
            message: "로그인이 필요한 서비스입니다. 다시 로그인해 주세요.",
          }),
        );
      }

      // 가짜 데이터에서 해당 이벤트 찾음
      const eventIndex = mockEventData.findIndex(
        (event) => event.event_id === parseInt(eventId),
      );

      if (eventIndex === -1) {
        return res(
          ctx.status(404),
          ctx.json({
            error: "not_found",
            message: "해당 캘린더를 찾을 수 없습니다.",
          }),
        );
      }

      // 이벤트 데이터 업데이트
      mockEventData[eventIndex] = {
        ...mockEventData[eventIndex],
        event_title: event_title || mockEventData[eventIndex].event_title,
        cal_title: cal_title || mockEventData[eventIndex].cal_title,
        cal_color: cal_color || mockEventData[eventIndex].cal_color,
        start_time: start_time || mockEventData[eventIndex].start_time,
        end_time: end_time || mockEventData[eventIndex].end_time,
        event_description:
          event_description || mockEventData[eventIndex].event_description,
        is_public:
          typeof is_public === "boolean"
            ? is_public
            : mockEventData[eventIndex].is_public,
      };

      // 200 OK 응답 반환
      return res(ctx.status(200), ctx.json(eventIndex[eventIndex]));
    },
  ), // 캘린더 삭제 핸들러
  rest.delete("/api/events/:eventId", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { eventId } = req.params;

    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요합니다. 다시 로그인해 주세요.",
        }),
      );
    }

    // 가짜 데이터에서 해당 이벤트를 찾음
    const eventIndex = mockEventData.findIndex(
      (event) => event.event_id === parseInt(eventId),
    );

    if (eventIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: "not_found",
          message: "해당 이밴트를 찾을 수 없습니다.",
        }),
      );
    }

    // 캘린더 삭제
    mockEventData.splice(eventIndex, 1);

    // 200 OK 응답 반환
    return res(
      ctx.status(200),
      ctx.json({ message: "이벤트가 성공적으로 삭제되었습니다." }),
    );
  }),
];
