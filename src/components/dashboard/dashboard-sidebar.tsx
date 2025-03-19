'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Settings,
  HelpCircle,
  LayoutDashboard,
  Users,
  FileText,
  PanelLeftIcon,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { signOut } from 'next-auth/react';

// Define navigation items with icons
const navItems = [
  { name: 'Dashboard', href: '/home', icon: Home },
  { name: 'Analytics', href: '/analytics', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export function DashboardSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const { isMobile } = useBreakpoint();

  const changeCollapseState = () => {
    setIsCollapsed(!isCollapsed && !isMobile);
  };

  const handleLogout = async () => {
    // Handle logout logic here

    await signOut();

    console.log('User logged out');
  };

  return (
    <div
      className={`contents md:!flex flex-col bg-accent/50 border-r z-40 gap-4 transition-all duration-300 ${isCollapsed ? 'w-17' : 'w-64'}`}
    >
      <div
        className={`fixed flex flex-col gap-4 transition-all duration-300 ${isCollapsed ? 'w-17' : 'w-64'} `}
      >
        <div
          onClick={changeCollapseState}
          className="flex h-14 items-center justify-between border-b px-4 md:h-16"
        >
          <Link href="/home" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          {!isMobile && (
            <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
              <PanelLeftIcon
                className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              />
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2">
            {navItems.map(item => (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={
                      item.href + `?${new URLSearchParams({ collapsed: isCollapsed.toString() })}`
                    }
                    className={`flex ${!isCollapsed ? '' : 'justify-center'} items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-primary ${
                      pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
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
        <div className="p-4 flex flex-col gap-2">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">
                <HelpCircle className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Help & Support</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Help & Support</TooltipContent>}
          </Tooltip>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full hover:bg-red-100 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span className="ml-2">Logout</span>}
              </Button>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
