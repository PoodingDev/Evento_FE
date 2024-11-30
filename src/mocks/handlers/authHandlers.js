import { HttpResponse, http } from "msw";

export const authHandlers = [
  http.post("/api/auth/social-login", async ({ request }) => {
    try {
      // 요청 본문에서 데이터 추출
      const body = await request.json();
      const { platform, code } = body;

      // 로그 추가: 핸들러 호출 및 데이터 확인
      console.log("Handler received:", platform, code);

      // 필수 데이터가 누락된 경우
      if (!platform || !code) {
        return HttpResponse.json(
          { error: "플랫폼 또는 인증 코드가 누락되었습니다." },
          { status: 400 },
        );
      }

      // 성공적인 응답
      return HttpResponse.json(
        {
          message: "토큰 발급 성공",
          token: `mock_${platform}_access_token`,
          userInfo: {
            name: `${platform} User`,
            email: `${platform}@example.com`,
          },
        },
        { status: 200 },
      );
    } catch (error) {
      console.error("Error parsing request JSON:", error);
      return HttpResponse.json(
        { error: "잘못된 요청 본문 형식입니다." },
        { status: 400 },
      );
    }
  }),
];
