import { rest } from "msw";

let mockUserData = {
  user_id: 1,
  user_name: "김벤토",
  user_email: "vento@evento.com",
  user_birth: "2024-11-30",
  user_nickname: "vento1",
  // is_birth_public: true,
};

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
    console.log(mockUserData);
    return res(ctx.status(200), ctx.json(mockUserData));
  }),

  // 사용자 정보 수정 핸들러
  rest.post("/api/users/:user_id", async (req, res, ctx) => {
    const token = req.headers.get("Authorization");
    const { user_id } = req.params;
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

    // 닉네임 중복 검사
    if (user_nickname === "중복테스트") {
      return res(
        ctx.status(400),
        ctx.json({
          error: "닉네임 중복",
          message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 선택해 주세요.",
        }),
      );
    }

    if (!user_nickname || !user_birth) {
      return res(
        ctx.status(400),
        ctx.json({
          error: "잘못된 데이터",
          message: "닉네임과 생일 정보가 필요합니다.",
        }),
      );
    }

    // 수정된 정보
    mockUserData = {
      ...mockUserData,
      user_nickname,
      user_birth,
      is_birth_public,
    };

    return res(
      ctx.status(200),
      ctx.json({
        ...mockUserData,
        message: "계정 정보가 성공적으로 수정되었습니다.",
      }),
    );
  }),

  //회원탈퇴
  rest.delete("/api/users/delete", (req, res, ctx) => {
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

    // 사용자 데이터 초기화
    mockUserData = null;

    return res(
      ctx.status(200),
      ctx.json({
        message: "회원탈퇴가 완료되었습니다.",
      }),
    );
  }),
];
