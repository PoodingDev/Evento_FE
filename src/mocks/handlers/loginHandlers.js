import { rest } from "msw";

export const loginHandlers = [
  // Google 로그인 요청 핸들러
  rest.post("/api/users/google-login", async (req, res, ctx) => {
    const { code } = await req.json();

    if (!code) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "invalid_request",
          message: "잘못된 요청 형식입니다. 인증 코드가 없습니다.",
        }),
      );
    }

    const fakeToken = "fake_token";

    return res(
      ctx.status(200),
      ctx.json({
        access: fakeToken,
        refresh: fakeToken,
      }),
    );
  }),

  // Kakao 로그인 요청 핸들러
  rest.post("/api/users/kakao-login", async (req, res, ctx) => {
    const { code } = await req.json();

    if (!code) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "invalid_request",
          message: "잘못된 요청 형식입니다. 인증 코드가 없습니다.",
        }),
      );
    }

    const fakeToken = "fake_token";

    return res(
      ctx.status(200),
      ctx.json({
        access: fakeToken,
        refresh: fakeToken,
      }),
    );
  }),

  // Naver 로그인 요청 핸들러
  rest.post("/api/users/naver-login", async (req, res, ctx) => {
    const { code, state } = await req.json();

    if (!code || !state) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "invalid_request",
          message: "잘못된 요청 형식입니다. 인증 코드 또는 상태 값이 없습니다.",
        }),
      );
    }

    const fakeToken = "fake_token";

    return res(
      ctx.status(200),
      ctx.json({
        access: fakeToken,
        refresh: fakeToken,
      }),
    );
  }),

  // 사용자 정보 요청 핸들러
  rest.get("/api/users/me", (req, res, ctx) => {
    const authHeader = req.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res(
        ctx.status(401),
        ctx.json({
          error: "unauthorized",
          message: "인증 토큰이 제공되지 않았습니다.",
        }),
      );
    }

    // 가짜 사용자 정보
    const userInfo = {
      user_id: 1,
      user_name: "김구글",
      user_email: "vento@evento.com",
      user_nickname: "vento1",
    };

    return res(ctx.status(200), ctx.json(userInfo));
  }),
];
