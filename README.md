🚧 This app is WIP 🚧

# Thermopolium

**Thermopolium** is a full-stack restaurant reservation platform built with React and TypeScript, designed as a portfolio project to demonstrate practical engineering skills and architectural decisions. The app simulates real-world restaurant booking flows, complete with admin capabilities, batch processing, and an emphasis on clean, maintainable design.

- 🌐 Live site: [https://my-booking.tech/](https://my-booking.tech/)
- 🔑 Admin login: [Login Page](https://my-booking.tech/booking/login)
  - Email: `restaurant1@example.com`
  - Password: `password1`

---

## 🛠 Tech Stack

- **Framework:** React Router (framework mode)
- **Languages:** TypeScript (frontend & backend)
- **Server-Side Rendering:** Built-in SSR from React Router
- **Form Validation:** Conform + Zod
- **Backend Architecture:** Layered (Controller → Service → Repository)
- **ORM:** Prisma (wrapped in repositories)
- **DI:** InversifyJS
- **Session Management:** Server-side sessions
- **Batch Processing:** Node scripts scheduled with Fly.io
- **Storage:** Amazon S3 (image upload), SES (email delivery)
- **Infrastructure:** Fly.io (split web & batch apps)
- **DB:** PostgreSQL

---

## 🔍 Project Highlights

- **Monolithic, yet scalable architecture**: Inspired by Rails/Laravel, blending SSR-first frontend with a clean backend layer structure.

- **Layered backend design**: Follows MVC principles with separation of concerns (controllers only handle routing and validation, business logic in services, DB access in repositories).

- **Colocation of logic**: Each route has colocated frontend/backend logic and types, making it easy to navigate and maintain.

- **DI with Inversify**: Promotes testability and decoupled architecture.

- **Strict error handling policy**: Errors are caught at the controller level only, with consistent custom error throwing in lower layers.

- **Session-based auth**: Built-in from scratch, no external auth providers, aligned with traditional secure patterns.

- **Controlled form inputs**: Conform + Zod enable fully validated forms without uncontrolled inputs.

- **Real email queueing system**: Emails are added to a DB queue and dispatched every minute using a batch job triggered by Fly.io's scheduler.

- **Separation of web & batch servers**: Prevents performance hits during email sending or background processing.
