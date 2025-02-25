import { Outlet } from "react-router";
import { Header } from "./Header";

export function Page() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}