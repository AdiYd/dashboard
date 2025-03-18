"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, HelpCircle, LayoutDashboard, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

// Define navigation items with icons
const navItems = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Analytics", href: "/analytics", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed flex h-full flex-col gap-4">
      <div className="flex h-14 items-center border-b px-4 md:h-16 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 md:px-4 lg:px-6">
          {navItems.map((item) => (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary ${
                    pathname === item.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="p-4">
        <Button variant="outline" className="w-full">
          <HelpCircle className="mr-2 h-4 w-4" />
          Help & Support
        </Button>
      </div>
    </div>
  );
}