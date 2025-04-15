import { LogOut, Settings, User } from 'lucide-react';
import { Form, Link } from 'react-router';

import { Button } from '~/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet';

export function Header() {
  return (
    <div className="flex items-center justify-between border-b px-4">
      <Link to="/" className="flex items-center h-16 font-semibold">
        My Reservation
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 7h18" />
              <path d="M3 12h18" />
              <path d="M3 17h18" />
            </svg>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/business/dashboard/">
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/business/settings/basic-info">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
            <Form method="post" action="/business/logout/">
              <Button
                variant="ghost"
                className="justify-start text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
