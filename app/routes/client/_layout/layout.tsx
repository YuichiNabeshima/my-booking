import { Outlet } from "react-router";
import { Header } from "./components/Header";


export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}