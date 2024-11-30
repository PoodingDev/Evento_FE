import { rest } from "msw";

export const authHandlers = [
  rest.post("/api/auth/social-login", (req, res, ctx) => {
    const { provider, access_token } = req.body;

    if (provider && access_token) {
      return res(ctx.status(200), ctx.json({ provider }));
    } else {
      return res(
        ctx.status(400),
        ctx.json({ error: "소셜 로그인 실패. 필수 정보가 없습니다." }),
      );
    }
  }),

  rest.post("/api/auth/logout", (req, res, ctx) => {
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      return res(
        ctx.status(200),
        ctx.json({ message: "로그아웃이 완료되었습니다." }),
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않은 요청입니다." }),
      );
    }
  }),
];
