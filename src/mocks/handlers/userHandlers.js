import { rest } from "msw";

export const userHandlers = [
  // 사용자 정보 조회 핸들러
  rest.get("/api/users/me", (req, res, ctx) => {
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

    return res(
      ctx.status(200),
      ctx.json({
        user_id: 1,
        user_name: "김벤토",
        user_email: "vento@evento.com",
        user_birth: "2024-11-30",
        user_nickname: "vento1",
      }),
    );
  }),

  // 사용자 정보 수정 핸들러
  rest.post("/api/users/:user_id", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { user_id } = req.params;

    // 요청 바디 데이터를 비동기로 읽어옴
    const { user_nickname, user_birth, is_birth_public } = await req.json();

    if (!token || token !== "Bearer fake_token") {
      return res(
        ctx.status(401),
        ctx.json({
          error: "인증 실패",
          message: "로그인이 필요합니다. 다시 로그인해 주세요.",
        }),
      );
    }

    if (user_id !== "1") {
      return res(
        ctx.status(404),
        ctx.json({
          error: "사용자 정보 없음",
          message: "현재 로그인된 사용자의 정보를 찾을 수 없습니다.",
        }),
      );
    }

    // 특정 데이터가 올바르지 않은 경우 수정
    if (!user_nickname || !user_birth) {
      console.warn("잘못된 요청 데이터:", {
        user_nickname,
        user_birth,
        is_birth_public,
      });

      return res(
        ctx.status(400),
        ctx.json({
          error: "잘못된 데이터",
          message: "닉네임과 생일 정보가 필요합니다. 다시 입력해 주세요.",
        }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user_id: 1,
        user_nickname,
        user_birth,
        is_birth_public,
        message: "계정 정보가 성공적으로 수정되었습니다.",
      }),
    );
  }),
];
