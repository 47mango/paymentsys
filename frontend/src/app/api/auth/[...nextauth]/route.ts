import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // 정적 자산이나 이미지 파일은 홈페이지로 리다이렉트
      if (
        url.includes('/images/') || 
        url.includes('/_next/') || 
        url.includes('.jpg') || 
        url.includes('.png') || 
        url.includes('.svg') ||
        url.includes('.ico') ||
        url.includes('.webp') ||
        url.includes('/api/auth/signin')
      ) {
        return baseUrl;
      }
      // 로그인 성공 후 홈페이지로 리다이렉트
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
