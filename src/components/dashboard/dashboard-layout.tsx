"use client";

import { TopNavbar } from "@/components/dashboard/top-navbar";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNavbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}