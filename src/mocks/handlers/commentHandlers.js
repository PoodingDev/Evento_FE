import { rest } from "msw";

// 가짜 데이터
let mockComments = [
  {
    comment_id: 1,
    event_id: 2,
    content: "뭐 먹을깝쇼",
    created_at: "2024-11-20T14:30:00",
    admin_id: 1,
  },
  {
    comment_id: 2,
    event_id: 2,
    content: "꼬기 레츠고",
    created_at: "2024-11-20T15:00:00",
    admin_id: 2,
  },
  {
    comment_id: 3,
    event_id: 2,
    content: "좋은디",
    created_at: "2024-11-20T15:00:00",
    admin_id: 1,
  },
  {
    comment_id: 4,
    event_id: 2,
    content: "냉면 시켜줭",
    created_at: "2024-11-20T15:00:00",
    admin_id: 1,
  },
  {
    comment_id: 5,
    event_id: 2,
    content: "자드가자",
    created_at: "2024-11-20T15:00:00",
    admin_id: 1,
  },
  {
    comment_id: 6,
    event_id: 2,
    content: "지각하지 말깅",
    created_at: "2024-11-20T15:00:00",
    admin_id: 1,
  },
];

export const commentHandlers = [
  // 댓글 작성
  rest.post(
    "/api/calendars/:calendar_id/events/:event_id/comments/",
    async (req, res, ctx) => {
      const { content } = await req.json();
      const { calendar_id, event_id } = req.params;

      const token = req.headers.get("Authorization");

      // 인증 실패
      if (!token || token !== "Bearer fake_token") {
        return res(
          ctx.status(403),
          ctx.json({
            error: "권한 없음",
            message: "이 이벤트에 댓글을 작성할 권한이 없습니다.",
          }),
        );
      }

      // 댓글 내용 없음
      if (!content) {
        return res(
          ctx.status(400),
          ctx.json({
            error: "invalid_request",
            message: "댓글 내용을 입력해주세요.",
          }),
        );
      }

      // 새 댓글 추가
      const newComment = {
        comment_id: mockComments.length + 1,
        event_id: parseInt(event_id),
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        admin_id: 1,
      };
      mockComments.push(newComment);

      return res(ctx.status(201), ctx.json(newComment));
    },
  ),

  // 댓글 조회
  rest.get(
    "/api/calendars/:calendar_id/events/:event_id/comments/",
    (req, res, ctx) => {
      const { event_id } = req.params;
      const token = req.headers.get("Authorization");

      // 인증 실패
      if (!token || token !== "Bearer fake_token") {
        return res(
          ctx.status(403),
          ctx.json({
            error: "권한 없음",
            message: "댓글을 조회할 권한이 없습니다.",
          }),
        );
      }

      // 해당 이벤트의 댓글 조회
      const eventComments = mockComments.filter(
        (comment) => comment.event_id === parseInt(event_id),
      );

      if (eventComments.length === 0) {
        return res(
          ctx.status(404),
          ctx.json({
            error: "이벤트 없음",
            message: "해당 이벤트를 찾을 수 없습니다.",
          }),
        );
      }

      return res(ctx.status(200), ctx.json({ comments: eventComments }));
    },
  ),
];
