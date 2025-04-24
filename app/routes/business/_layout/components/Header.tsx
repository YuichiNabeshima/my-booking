import { Github, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { Form, Link, useLocation } from 'react-router';

import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container flex items-center justify-between mx-auto px-4 sm:px-6">
        <Link to="/business/dashboard" className="flex items-center h-16 font-semibold">
          Admin
        </Link>
        <div className="flex gap-3 items-center">
          <a
            href={
              location.pathname === '/business/dashboard'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/dashboard'
                : location.pathname === '/business/settings/basic-info'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/settings/basic_info'
                : location.pathname === '/business/settings/business-hours'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/settings/business_hours'
                : location.pathname === '/business/settings/seat-settings'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/settings/seat_settings'
                : location.pathname === '/business/settings/gallery'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/settings/gallery'
                : location.pathname === '/business/settings/course-selection'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/settings/course_selection'
                : location.pathname === '/business/settings/tag'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/settings/tag'
                : location.pathname === '/business/login'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/login'
                : location.pathname === '/business/signup'
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/signup'
                : /^\/business\/booking\/\d+$/.test(location.pathname)
                ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/business/booking/bookingId'
                : 'https://github.com/YuichiNabeshima/my-booking'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 cursor-pointer">
              <Github className="h-4 w-4" />
              <span>View Code</span>
            </Button>
          </a>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 h-11 w-11 cursor-pointer">
                <span className="sr-only">Open menu</span>
                <div className="relative w-6 h-6">
                  <span className="absolute top-[2px] left-0 w-6 h-[3px] bg-current rounded-full"></span>
                  <span className="absolute top-[10px] left-0 w-6 h-[3px] bg-current rounded-full"></span>
                  <span className="absolute bottom-[2px] left-0 w-6 h-[3px] bg-current rounded-full"></span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle className="text-xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 mt-6">
                <Button variant="ghost" className="justify-start h-12 text-base" asChild>
                  <Link to="/business/dashboard/" onClick={() => setIsOpen(false)}>
                    <User className="mr-3 h-5 w-5" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start h-12 text-base" asChild>
                  <Link to="/business/settings/basic-info" onClick={() => setIsOpen(false)}>
                    <Settings className="mr-3 h-5 w-5" />
                    Settings
                  </Link>
                </Button>
                <Form method="post" action="/business/logout/">
                  <Button
                    variant="ghost"
                    className="justify-start h-12 text-base text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Button>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
