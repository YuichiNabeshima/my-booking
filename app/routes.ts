import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("booking", [
    route(":clientId", "routes/booking/clientId/index/route.tsx"),
    route(":clientId/confirm", "routes/booking/clientId/confirm/route.tsx"),
  ]),

  layout("routes/client/_auth/auth.tsx", [

    route("client", "routes/client/_layout/layout.tsx", [
      index("routes/client/index/route.tsx"),
      route("settings", "routes/client/settings/route.tsx"),
    ]),
  ]),

  ...prefix("client", [
    route("login", "routes/client/login/route.tsx"),
    route("signup", "routes/client/signup/route.tsx"),
  ]),

  route("client/logout", "routes/client/logout/route.tsx"),

] satisfies RouteConfig;
