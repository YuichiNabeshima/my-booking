import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("booking/:businessId", [
    index("routes/booking/businessId/index/route.tsx"),
    route("confirm", "routes/booking/businessId/confirm/route.tsx"),
    route("availability", "routes/booking/businessId/availability/route.tsx"),
  ]),

  layout("routes/business/_auth/auth.tsx", [

    route("business", "routes/business/_layout/layout.tsx", [
      route("dashboard", "routes/business/dashboard/route.tsx"),
      route("settings", "routes/business/settings/route.tsx"),
    ]),
  ]),

  ...prefix("business", [
    route("login", "routes/business/login/route.tsx"),
    route("signup", "routes/business/signup/route.tsx"),
  ]),

  route("business/logout", "routes/business/logout/route.tsx"),

] satisfies RouteConfig;
