import { rest } from "msw";

export const loginHandlers = [
  // 소셜 로그인 요청 핸들러
  rest.post("/api/auth/social-login", async (req, res, ctx) => {
    let requestBody;

    try {
      requestBody = await req.json();
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "invalid_request",
          message: "JSON 파싱에 실패했습니다.",
        }),
      );
    }

    const { provider, access_token } = requestBody;

    if (!provider || !access_token) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "invalid_request",
          message: "잘못된 요청 형식입니다.",
        }),
      );
    }

    // 가짜 토큰 및 사용자 정보 생성
    let fakeToken = `${provider}_token`;
    let userInfo = {
      user_id: 1,
      user_name: `${provider}_user1`,
      user_email: `user@${provider}.com`,
      user_nickname: `${provider}User`,
    };

    // 정상적인 응답 반환
    return res(
      ctx.status(200),
      ctx.json({
        token: fakeToken,
        userInfo,
      }),
    );
  }),
];
