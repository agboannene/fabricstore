# FabricStore — AGENTS.md

*Self-improving guidance for AI-assisted development. Update this file as the codebase evolves — add new conventions, patterns, and decisions so every agent session starts smarter than the last.*

---

## Project Overview

| Field | Value |
|---|---|
| **Project** | FabricStore — Full-stack e-commerce & operations platform for a fabric business |
| **Stack** | *TBD — update once decided* |
| **Structure** | Monorepo (frontend + backend + docs) |
| **Docs** | `docs/fabricstore-dossier.md` (business reqs), `docs/fabricstore-prd.md` (product reqs), `docs/fabricstore-brand.md` (brand guide), `docs/fabricstore-design-system.md` (design system) |
| **Build Tool** | *TBD* |
| **Package Manager** | *TBD* |
| **DB** | PostgreSQL |
| **Testing** | *TBD* |

---

## Tech Stack Decisions

*Record decisions here as they are made. This prevents re-debating settled choices.*

| Decision | Chosen Option | Rationale | Date |
|---|---|---|---|
| Backend framework | — | — | — |
| Frontend (Store) | — | — | — |
| Frontend (Dashboard) | — | — | — |
| ORM | — | — | — |
| Auth library | — | — | — |
| UI component library | — | — | — |
| CSS approach | — | — | — |
| Testing framework | — | — | — |
| Linting | — | — | — |
| Hosting | — | — | — |
| Image service | — | — | — |
| SMS provider | — | — | — |
| Email provider | — | — | — |

---

## Project Structure Convention

```
fabricstore/
├── apps/
│   ├── store/              # Customer-facing Next.js app (SSR)
│   │   ├── src/
│   │   │   ├── app/        # App router pages
│   │   │   ├── components/ # Shared UI components
│   │   │   ├── lib/        # Utilities, API client
│   │   │   └── styles/     # Global styles, tokens
│   │   └── public/         # Static assets
│   └── dashboard/          # Staff dashboard SPA (React/Vue)
│       ├── src/
│       │   ├── pages/      # Route pages
│       │   ├── components/ # Dashboard-specific components
│       │   ├── lib/        # API client, auth, utils
│       │   └── hooks/      # Custom hooks
│       └── public/
├── packages/
│   └── shared/             # Shared types, constants, utils
│       ├── src/
│       │   ├── types/      # TypeScript interfaces / Zod schemas
│       │   ├── constants/  # Enums, status maps, config
│       │   └── utils/      # Shared utility functions
│       └── package.json
├── server/                 # Backend API (monolith)
│   ├── src/
│   │   ├── routes/         # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # DB models / schemas
│   │   ├── middleware/     # Auth, RBAC, validation
│   │   ├── jobs/           # Background jobs
│   │   └── config/         # Configuration
│   ├── migrations/         # DB migrations
│   ├── seeds/              # Seed data (fabric types, admin)
│   └── tests/
├── docker/                 # Dockerfiles, compose files
├── docs/                   # Documentation
├── .github/                # CI/CD workflows
├── AGENTS.md               # This file
├── package.json            # Root workspace config (if monorepo)
└── README.md
```

---

## Coding Conventions

### General
- TypeScript for type safety (preferred) or JSDoc for plain JS
- Use the shared types package for all API request/response types
- Prefer async/await over raw promises
- All API responses follow the envelope format: `{ success: boolean, data: T, error?: string, meta?: { total, page, limit, pages } }`
- Error handling: use a centralized error handler middleware on the server; use try/catch with user-friendly messages on the client

### Naming
- **Files:** `kebab-case.ts` (React components: `PascalCase.tsx`)
- **Components:** `PascalCase`
- **Functions/Variables:** `camelCase`
- **Constants/Enums:** `UPPER_SNAKE_CASE`
- **Types/Interfaces:** `PascalCase`, prefix with `I` only for interface vs type distinction when needed
- **Database columns:** `snake_case`
- **API routes:** `kebab-case` (`/api/v1/delivery-fees/domestic`)
- **Git branches:** `type/short-description` (`feat/stock-management`, `fix/cart-quantity-overflow`)

### Formatting
- Indent: 2 spaces
- Semicolons: required
- Quotes: single quotes for JS/TS, double quotes for JSX attributes
- Trailing commas: always (multi-line), never (single-line)
- Max line length: 100 characters
- File structure (React): imports → constants/types → component → styled/helper exports → default export

---

## Testing Conventions

*Update as testing framework and conventions are decided.*

- Test framework: *TBD*
- Test file placement: co-located with source (e.g., `Button.tsx` → `Button.test.tsx`)
- Naming: `describe('ComponentName')` / `it('should behave expectedly')`
- Coverage threshold: *TBD*
- API tests: integration tests against test DB
- Component tests: RTL / Testing Library approach
- E2E: *TBD*

---

## Git & Commit Convention

- Commits: only when explicitly requested
- Commit message format: `type(scope): description` (e.g., `feat(orders): add status update endpoint`)
- Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`
- Branch: created from `main`, merged via PR
- PR title: matches commit message format

---

## Agent Instructions for Common Tasks

### Adding a New API Endpoint
1. Define request/response types in `packages/shared/src/types/`
2. Add route handler in `server/src/routes/` following existing pattern
3. Add service method in `server/src/services/`
4. Add input validation (Zod or equivalent) in middleware
5. Add RBAC check middleware (if staff-only)
6. Write integration test
7. Update API client in both `apps/store` and `apps/dashboard` if consumed

### Adding a New Database Migration
1. Create migration file in `server/migrations/` with timestamp prefix
2. Define `up` and `down` functions
3. Add corresponding model/schema in `server/src/models/`
4. Run migration locally to verify
5. Update seed data if necessary

### Adding a New UI Component (Store)
1. Check design system (`docs/fabricstore-design-system.md`) for existing patterns
2. Create component in `apps/store/src/components/` as `PascalCase.tsx`
3. Use design tokens from the shared theme (never hardcode colours/typography)
4. Make responsive (mobile-first)
5. Add loading, empty, error states
6. Export from `apps/store/src/components/index.ts`

### Adding a New UI Component (Dashboard)
1. Same as store but place in `apps/dashboard/src/components/`
2. Use dashboard-specific compact typography tokens
3. Ensure role-based visibility is handled if needed (accept `userRole` prop or use auth context)

### Adding a New Payment Provider
1. Create provider module in `server/src/services/payments/` implementing the `PaymentProvider` interface
2. Add webhook handler route
3. Add payment method enum entry
4. Add UI payment option in store checkout
5. Update `docs/` if relevant

---

## Environment Variables

*Update as env vars are identified. Never commit actual values.*

| Variable | Description | Required In |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | server |
| `JWT_SECRET` | JWT signing secret | server |
| `PAYSTACK_SECRET_KEY` | Paystack live secret | server |
| `PAYSTACK_PUBLIC_KEY` | Paystack live public | store |
| `FLUTTERWAVE_SECRET_KEY` | Flutterwave secret | server |
| `FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public | store |
| `TWILIO_ACCOUNT_SID` | SMS provider SID | server |
| `TWILIO_AUTH_TOKEN` | SMS provider token | server |
| `TWILIO_PHONE_NUMBER` | SMS sender number | server |
| `SENDGRID_API_KEY` | Email provider key | server |
| `CLOUDINARY_URL` | Image service URL | server |
| `NEXT_PUBLIC_API_URL` | Public API base URL | store |
| `DASHBOARD_API_URL` | Internal API base URL | dashboard |
| `EXCHANGE_RATE_API_KEY` | Live forex rate API key | server |

---

## Common Commands

*Update with actual commands once tooling is chosen.*

```bash
# Development
npm run dev          # Start all dev servers
npm run dev:server   # Start backend only
npm run dev:store    # Start store frontend only
npm run dev:dashboard# Start dashboard only

# Database
npm run db:migrate   # Run pending migrations
npm run db:seed      # Seed initial data
npm run db:reset     # Drop, recreate, migrate, seed

# Testing
npm run test         # Run all tests
npm run test:watch   # Watch mode
npm run test:cov     # Coverage report

# Linting
npm run lint         # ESLint
npm run typecheck    # TypeScript checks
npm run format       # Prettier

# Build
npm run build        # Production build
```

---

## Architecture Decisions Log

*Record architecture decisions (ADRs) here as they are made.*

| ADR | Decision | Context | Date |
|---|---|---|---|
| — | — | — | — |

---

## Self-Improvement Rules

1. **Update this file** whenever you discover a new convention, pattern, or decision that future sessions should know about.
2. **Add to the Tech Stack Decisions table** when a technology choice is made or finalized.
3. **Document non-obvious gotchas** — workarounds, known issues, third-party quirks.
4. **Keep the directory structure accurate** — update if the actual layout deviates from the convention described here.
5. **Remove obsolete guidance** — if a convention is superseded, replace it rather than accumulating dead rules.

---

*This file evolves with the project. Every agent session contributes to making the next one more effective.*
