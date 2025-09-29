'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // 로딩 중일 때는 아무것도 하지 않음

    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  // 로딩 중이거나 세션이 없을 때는 로딩 화면 표시
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 세션이 없으면 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (!session) {
    return null;
  }

  // 세션이 있으면 자식 컴포넌트들을 렌더링
  return <>{children}</>;
}
