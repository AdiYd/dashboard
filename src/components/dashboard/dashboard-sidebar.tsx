"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Settings, HelpCircle, LayoutDashboard, Users, FileText, PanelLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`fixed flex h-full flex-col gap-4 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex h-14 items-center justify-between border-b px-4 md:h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <PanelLeftIcon className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2">
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
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
            </Tooltip>
          ))}
        </nav>
      </div>
      <Separator />
      <div className="p-4">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button variant="outline" className="w-full">
              <HelpCircle className="h-4 w-4" />
              {!isCollapsed && <span className="ml-2">Help & Support</span>}
            </Button>
          </TooltipTrigger>
          {isCollapsed && <TooltipContent side="right">Help & Support</TooltipContent>}
        </Tooltip>
      </div>
    </div>
  );
}