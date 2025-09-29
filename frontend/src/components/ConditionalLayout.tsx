'use client';

import { usePathname } from 'next/navigation';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AuthWrapper from "./AuthWrapper"

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // 로그인 페이지나 API 라우트에서는 사이드바 없이 렌더링
  if (pathname?.startsWith('/auth') || pathname?.startsWith('/api')) {
    return <>{children}</>;
  }

  // 인증이 필요한 페이지에서는 AuthWrapper와 사이드바 포함
  return (
    <AuthWrapper>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="p-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </AuthWrapper>
  );
}
