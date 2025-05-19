
//import TopNav from '@/components/top-nav';
import { SideNav } from '@/components/side-nav';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <SidebarProvider>
        <SideNav />
        <main className="relative w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
