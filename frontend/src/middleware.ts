import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // 인증이 필요한 페이지들에 대한 추가 로직이 있다면 여기에 작성
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // 인증이 필요한 페이지들 (로그인 페이지는 제외)
    "/((?!auth|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
