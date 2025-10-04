import { ChefHat, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router';

import { Button } from '~/components/ui/button';

export function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Thermopolium</span>
        </Link>
        {isHomePage && (
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </a>
            <a href="#tech-stack" className="text-sm font-medium hover:text-primary">
              Tech Stack
            </a>
          </nav>
        )}
        <div className="flex gap-3">
          <div className="flex gap-3">
            <a
              href={
                location.pathname === '/'
                  ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/index'
                  : location.pathname === '/booking'
                  ? 'https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/booking/index'
                  : /^\/booking\/[a-zA-Z0-9-]+$/.test(location.pathname)
                  ? `https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/booking/businessUuid/index`
                  : /^\/booking\/[a-zA-Z0-9-]+\/confirm$/.test(location.pathname)
                  ? `https://github.com/YuichiNabeshima/my-booking/tree/main/app/routes/booking/businessUuid/confirm`
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
            <Link to="/booking">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium cursor-pointer"
              >
                Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
