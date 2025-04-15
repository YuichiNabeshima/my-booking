import { Outlet } from 'react-router';

import { Footer } from './Footer';
import { Header } from './Header';
export function Page() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
