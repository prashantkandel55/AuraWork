<p align="center">
  <img src="logo.png" alt="AuraWork logo" width="120" />
</p>

# AuraWork

**Free, open-source workforce management** — replace paid services like Homebase and 7shifts with a self-hosted platform for scheduling, time tracking, and team communication.

---

## Features

### Employee PWA (Mobile-first)
- **Clock in/out** — One-tap with location tagging
- **Schedule** — View shifts and request time off
- **Shift coverage** — Request and claim coverage for shifts
- **Group chat** — Real-time messaging with the team

### Admin Desktop Dashboard
- **Schedule management** — Drag-and-drop weekly/monthly scheduling
- **Time & attendance** — View and edit hours for payroll accuracy
- **Request handling** — Approve or deny time-off and coverage requests
- **Payroll** — Salaries, tax data, and payroll tracking
- **Employee oversight** — Directory, profiles, and permissions

---

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Admin | React SPA (Electron wrapper available) |
| Employee | PWA (Add to Home Screen) |
| Backend | Node.js, NestJS, REST + WebSockets |
| Database | PostgreSQL, TypeORM |

---

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or use Docker)

### Local development

```
npm install
npm run start:dev --workspace apps/api
npm run dev --workspace apps/admin
npm run dev --workspace apps/employee
```

- **Admin:** http://localhost:5175
- **Employee PWA:** http://localhost:5176
- **API:** http://localhost:3000

### Docker (self-hosted)

```
docker compose up --build
```

See [docs/SELF_HOSTING.md](docs/SELF_HOSTING.md) for full deployment and production notes.

---

## Project Structure

```
Aurawork/
├── apps/
│   ├── api/           # NestJS backend (REST + WebSockets)
│   ├── admin/         # Admin dashboard (React)
│   ├── employee/      # Employee PWA (React)
│   └── desktop-admin/ # Electron wrapper for admin
├── packages/
│   └── ui/            # Shared UI components
├── docs/
│   └── SELF_HOSTING.md
└── logo.png
```

---

## License

MIT
