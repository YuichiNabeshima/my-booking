import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Page() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}