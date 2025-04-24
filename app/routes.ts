import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  layout('routes/booking/_layout/layout.tsx', [
    index('routes/index/route.tsx'),

    route('booking', 'routes/booking/index/route.tsx'),

    ...prefix('booking/:businessUuid', [
      index('routes/booking/businessUuid/index/route.tsx'),
      route('confirm', 'routes/booking/businessUuid/confirm/route.tsx'),
      route('availability', 'routes/booking/businessUuid/availability/route.tsx'),
    ]),
  ]),

  layout('routes/business/_auth/auth.tsx', [
    route('business', 'routes/business/_layout/layout.tsx', [
      route('dashboard', 'routes/business/dashboard/route.tsx'),

      route('booking/:bookingId', 'routes/business/booking/bookingId/route.tsx'),

      route('settings', 'routes/business/settings/_layout/layout.tsx', [
        route('basic-info', 'routes/business/settings/basic_info/route.tsx'),
        route('course-selection', 'routes/business/settings/course_selection/route.tsx'),
        route('seat-settings', 'routes/business/settings/seat_settings/route.tsx'),
        route('gallery', 'routes/business/settings/gallery/route.tsx'),
        route('business-hours', 'routes/business/settings/business_hours/route.tsx'),
        route('tag', 'routes/business/settings/tag/route.tsx'),
      ]),
    ]),
  ]),

  ...prefix('business', [
    route('login', 'routes/business/login/route.tsx'),
    route('signup', 'routes/business/signup/route.tsx'),
  ]),

  route('business/logout', 'routes/business/logout/route.tsx'),

  // api
  ...prefix('api', [route('cron-task', 'routes/api/cron_task/route.tsx')]),
] satisfies RouteConfig;
