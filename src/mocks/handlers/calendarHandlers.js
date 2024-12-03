import { rest } from "msw";

//내 캘린더
let mockCalendars = [
  {
    calendar_id: 1,
    calendar_name: "Creator test",
    calendar_description: "삭제 권한 있어야 함",
    calendar_color: "#FFC960",
    is_public: false,
    creator_id: 1,
    invitation_code: "ABC123",
    members: [
      { id: 11, nickname: "Manager1" },
      { id: 12, nickname: "Manager2" },
    ],
  },
  {
    calendar_id: 2,
    calendar_name: "Admin Test",
    calendar_description: "삭제 권한 없어야 함",
    calendar_color: "#6D87D5",
    is_public: true,
    creator_id: 2,
    invitation_code: "G3G7H3",
    members: [
      { id: 1, nickname: "김벤토" },
      { id: 12, nickname: "Manager2" },
    ],
  },
  {
    calendar_id: 3,
    calendar_name: "FE 캘린더",
    calendar_description: "삭제 권한 있어야 함",
    calendar_color: "#E05C5C",
    is_public: false,
    creator_id: 1,
    invitation_code: "ABC123",
    members: [
      { id: 11, nickname: "Manager1" },
      { id: 12, nickname: "Manager2" },
    ],
  },
  {
    calendar_id: 4,
    calendar_name: "BE캘린더",
    calendar_description: "삭제 권한 있어야 함",
    calendar_color: "#7DBE7E",
    is_public: true,
    creator_id: 1,
    invitation_code: "A1B2C3",
    members: [
      { id: 11, nickname: "Manager1" },
      { id: 12, nickname: "Manager2" },
    ],
  },
];

//구독한 캘린더
let mockSubscriptions = [
  {
    calendar_id: 5,
    calendar_name: "IU",
    calendar_description: "dlwlrma",
  },
  {
    calendar_id: 6,
    calendar_name: "BTS",
    calendar_description: "bts_official",
  },
  {
    calendar_id: 7,
    calendar_name: "PoodingDev",
    calendar_description: "eventoteam",
  },
  {
    calendar_id: 8,
    calendar_name: "유재석",
    calendar_description: "MC Yoo",
  },
];

let mockSearchCalendars = [
  {
    calendar_id: 5,
    name: "IU",
    description: "IU의 캘린더입니다.",
    is_public: true,
    color: "#FF5733",
    creator: { nickname: "dlwlrma" },
  },
  {
    calendar_id: 6,
    name: "BTS",
    description: "BTS의 캘린더입니다.",
    is_public: true,
    color: "#33FF57",
    creator: { nickname: "bts_official" },
  },
];

export const calendarHandlers = [
  // 내 캘린더
  rest.get("/api/calendars/admins", (req, res, ctx) => {
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

  // // 관리자 초대 핸들러
  // rest.post("/api/calendars/:calendarId/admins", async (req, res, ctx) => {
  //   const token = req.headers.get("Authorization");
  //   const { calendarId } = req.params;
  //   const { invitation_code } = await req.json();
  //   const user_id = 2; // 이 부분은 실제로 요청을 보낸 사용자 ID로 변경 필요 (여기서는 예시로 user_id = 2 사용)

  //   if (!token || token !== "Bearer fake_token") {
  //     return res(
  //       ctx.status(401),
  //       ctx.json({
  //         error: "인증 실패",
  //         message: "로그인이 필요한 서비스입니다. 다시 로그인해 주세요.",
  //       }),
  //     );
  //   }

  //   // 캘린더 찾기
  //   const calendarIndex = mockCalendars.findIndex(
  //     (cal) => cal.calendar_id === parseInt(calendarId),
  //   );

  //   if (calendarIndex === -1) {
  //     return res(
  //       ctx.status(404),
  //       ctx.json({
  //         error: "not_found",
  //         message: "해당 캘린더를 찾을 수 없습니다.",
  //       }),
  //     );
  //   }

  //   // 초대 코드가 일치하는지 확인
  //   if (mockCalendars[calendarIndex].invitation_code !== invitation_code) {
  //     return res(
  //       ctx.status(400),
  //       ctx.json({
  //         error: "유효하지 않은 초대 코드입니다.",
  //       }),
  //     );
  //   }

  //   // 관리자로 추가하기 (이미 관리자가 아닌 경우에만 추가)
  //   if (!mockCalendars[calendarIndex].admins.includes(user_id)) {
  //     mockCalendars[calendarIndex].admins.push(user_id);
  //   }

  //   // 201 Created 응답 반환
  //   return res(
  //     ctx.status(201),
  //     ctx.json({
  //       message: "사용자가 성공적으로 관리자로 초대되었습니다.",
  //       user_id,
  //       calendar_id: parseInt(calendarId),
  //     }),
  //   );
  // }),

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
      invitation_code: "DEF456", // 생성된 초대 코드
      admins: [1], // 생성자는 자동으로 관리자
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

  // 캘린더 삭제 핸들러
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

  //구독 조회
  rest.get("/api/users/:user_id/subscriptions", (req, res, ctx) => {
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

    // 구독한 캘린더 반환
    return res(ctx.status(200), ctx.json(mockSubscriptions));
  }),

  // 구독 취소
  rest.delete("/api/subscriptions/:calendar_id", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { calendar_id } = req.params;

    // 인증 토큰 확인
    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요합니다. 다시 로그인해 주세요.",
        }),
      );
    }

    // 해당 캘린더 인덱스 확인
    const calendarIndex = mockSubscriptions.findIndex(
      (calendar) => calendar.calendar_id === parseInt(calendar_id, 10),
    );

    if (calendarIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: "캘린더 없음",
          message: "구독 중인 캘린더를 찾을 수 없습니다.",
        }),
      );
    }

    mockSubscriptions.splice(calendarIndex, 1);

    return res(ctx.status(204));
  }),

  // 공개 캘린더 검색
  rest.get("/api/users/calendars/search", (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const nickname = req.url.searchParams.get("nickname");

    // 인증 확인
    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요합니다. 다시 로그인해 주세요.",
        }),
      );
    }

    // 검색어 확인
    if (!nickname) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "잘못된 요청",
          message: "닉네임 쿼리 파라미터가 필요합니다.",
        }),
      );
    }

    // 닉네임 필터링
    const filteredCalendars = mockSearchCalendars.filter((calendar) =>
      calendar.creator.nickname.toLowerCase().includes(nickname.toLowerCase()),
    );

    // 결과 반환
    if (filteredCalendars.length > 0) {
      return res(ctx.status(200), ctx.json(filteredCalendars));
    } else {
      return res(
        ctx.status(404),
        ctx.json({
          error: "사용자 없음",
          message: "일치하는 닉네임의 사용자를 찾을 수 없습니다.",
        }),
      );
    }
  }),
];
