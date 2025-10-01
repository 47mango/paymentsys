import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    
    // 정적 자산이나 이미지 파일은 인증 체크를 건너뛰기
    if (
      pathname.startsWith('/images/') ||
      pathname.startsWith('/_next/') ||
      pathname.includes('.jpg') ||
      pathname.includes('.png') ||
      pathname.includes('.svg') ||
      pathname.includes('.ico') ||
      pathname.includes('.webp') ||
      pathname.includes('.jpeg') ||
      pathname.includes('.gif')
    ) {
      return NextResponse.next();
    }
    
    // 인증이 필요한 페이지들에 대한 추가 로직이 있다면 여기에 작성
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // 정적 자산은 인증 체크 제외
        if (
          pathname.startsWith('/images/') ||
          pathname.startsWith('/_next/') ||
          pathname.includes('.jpg') ||
          pathname.includes('.png') ||
          pathname.includes('.svg') ||
          pathname.includes('.ico') ||
          pathname.includes('.webp') ||
          pathname.includes('.jpeg') ||
          pathname.includes('.gif')
        ) {
          return true;
        }
        
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // 인증이 필요한 페이지들 (로그인 페이지와 정적 자산은 제외)
    "/((?!auth|api/auth|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
