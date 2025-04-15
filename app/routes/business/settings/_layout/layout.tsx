import { Link, Outlet, useLocation } from 'react-router';

import { cn } from '~/lib/utils';

import { ActionToast } from './components/ActionToast';

export default function Layout() {
  const location = useLocation();
  const lastPath = location.pathname.split('/').pop();

  const navItems = [
    { label: 'Basic Information', to: 'basic-info' },
    { label: 'Course Selection', to: 'course-selection' },
    { label: 'Seat Settings', to: 'seat-settings' },
    { label: 'Gallery', to: 'gallery' },
    { label: 'Business Hours', to: 'business-hours' },
    { label: 'Tag', to: 'tag' },
  ];

  return (
    <>
      <ActionToast />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 p-6">
          <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="flex flex-wrap w-full rounded-lg p-1 bg-muted/20">
              {navItems.map((item) => {
                const isActive = lastPath === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'basis-1/3 flex justify-center py-2 px-3 border text-sm font-medium rounded-md transition-all',
                      isActive
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
