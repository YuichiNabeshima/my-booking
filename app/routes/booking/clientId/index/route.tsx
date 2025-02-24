import type { Route } from "./+types/route";
import { _action } from "./action";
import { Page } from "./components/Page";
import { _loader } from "./loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Booking detail" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const loader = _loader;

export const action = _action;

export default function Route() {
  return <Page />;
}
