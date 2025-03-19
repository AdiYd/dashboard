'use client';

import { MenuIcon, BellIcon, Search, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';

export function TopNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="flex h-14 items-center gap-4 px-4 md:h-16 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <DashboardSidebar collapsed={false} />
          </SheetContent>
        </Sheet>

        <div className="hidden md:block">
          <span className="font-semibold text-xl">Dashboard</span>
        </div>

        <div className="flex-1 flex items-center justify-end gap-4 md:justify-between">
          <div className="relative max-w-sm w-full hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="w-full pl-8 bg-transparent" />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
