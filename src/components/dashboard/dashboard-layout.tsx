'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TopNavbar } from '@/components/dashboard/top-navbar';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';

export function DashboardLayout({
  children,
  collapsed = false,
}: {
  children: React.ReactNode;
  collapsed?: boolean;
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10vh] right-[-20vw] w-1/2 h-1/2 rounded-full bg-gradient-to-r from-emerald-500/50 to-violet-500/50 blur-[100px]" />
        <div className="absolute bottom-0 left-[-10vw] w-1/2 h-1/4 rounded-full bg-gradient-to-r from-violet-300/50 to-amber-500/50 blur-[100px]" />
      </div>

      <TopNavbar />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar collapsed={collapsed} />
        <main className="flex-1 overflow-auto relative">
          <div className="h-full w-full p-1 max-w-[1400px] mx-auto">
            <div className="mx-auto w-full h-full p-2 md:p-6 rounded-lg bg-background/70 backdrop-blur-sm">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
