import { Outlet, useLoaderData } from "react-router";
import { loader } from "../auth";

export function Page() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div>
      <Outlet />
    </div>
  );
}