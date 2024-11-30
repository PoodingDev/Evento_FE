import * as msw from "msw";

const { rest } = msw;

export const userHandlers = [
  rest.post("/api/users/register", (req, res, ctx) => {
    const {
      user_login_id,
      user_email,
      user_password,
      user_name,
      user_birth,
      user_nickname,
    } = req.body;

    if (
      user_login_id &&
      user_email &&
      user_password &&
      user_name &&
      user_birth &&
      user_nickname
    ) {
      return res(
        ctx.status(201),
        ctx.json({
          user_id: 1,
          user_email,
          user_name,
          user_birth,
          user_nickname,
          message: "회원가입이 성공적으로 완료되었습니다.",
        }),
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({ error: "회원가입 실패. 필수 정보가 누락되었습니다." }),
      );
    }
  }),

  rest.get("/api/users/me", (req, res, ctx) => {
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      return res(
        ctx.status(200),
        ctx.json({
          user_id: 1,
          user_email: "user@example.com",
          user_name: "User1",
          user_birth: "2024-11-29",
          user_nickname: "벤토야",
        }),
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({ error: "인증되지 않은 요청입니다." }),
      );
    }
  }),
];
