import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("routes/booking/_layout/layout.tsx", [
    index("routes/home.tsx"),

    route("booking", "routes/booking/index/route.tsx"),

    ...prefix("booking/:businessId", [
      index("routes/booking/businessId/index/route.tsx"),
      route("confirm", "routes/booking/businessId/confirm/route.tsx"),
      route("availability", "routes/booking/businessId/availability/route.tsx"),
    ]),
  ]),

  layout("routes/business/_auth/auth.tsx", [

    route("business", "routes/business/_layout/layout.tsx", [
      route("dashboard", "routes/business/dashboard/route.tsx"),

      route("settings", "routes/business/settings/_layout/layout.tsx", [
        route("basic-info", "routes/business/settings/basic_info/route.tsx"),
        route("course-selection", "routes/business/settings/course_selection/route.tsx"),
        route("seat-settings", "routes/business/settings/seat_settings/route.tsx"),
        route("gallery", "routes/business/settings/gallery/route.tsx"),
        route("business-hours", "routes/business/settings/business_hours/route.tsx"),
        route("tag", "routes/business/settings/tag/route.tsx"),
      ]),
    ]),
  ]),

  ...prefix("business", [
    route("login", "routes/business/login/route.tsx"),
    route("signup", "routes/business/signup/route.tsx"),
  ]),

  route("business/logout", "routes/business/logout/route.tsx"),

] satisfies RouteConfig;
