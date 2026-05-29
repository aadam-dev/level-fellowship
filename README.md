# From Classroom to Industry

Campus-embedded career development platform: two-semester curriculum, open-access events, ambassador vetting, anonymized talent registry, and Wakalah bil-Ujrah financial governance.

**Repository:** [github.com/aadam-dev/level-fellowship](https://github.com/aadam-dev/level-fellowship)

## Stack

- Next.js 16 (App Router)
- Prisma 6 + PostgreSQL
- Auth.js credentials + Argon2id
- Stripe (optional) for invoice collection
- Vitest with coverage gates in CI

## Quick start

```bash
git clone https://github.com/aadam-dev/level-fellowship.git
cd level-fellowship
cp .env.example .env
# Generate secrets (do not use defaults in production):
# openssl rand -base64 32
npm install
docker compose up -d db
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run test:coverage` | Unit tests (≥85% coverage on core services) |
| `npm run test:demo` | Integration tests for seeded demo users (requires DB) |
| `npm run verify:demo` | CLI check that all demo logins work |
| `npm run setup:local` | Docker DB + migrate + seed + verify demos |
| `npm run db:seed` | Load development seed data |

## Demo accounts (local development only)

After `npm run db:seed`, these accounts exist **only in your local database**. Do not deploy seed data or default passwords to production.

| Email | Password | Role |
|-------|----------|------|
| `candidate@classroom.local` | `password123` | candidate |
| `ambassador@classroom.local` | `password123` | ambassador |
| `enterprise@classroom.local` | `password123` | enterprise |
| `admin@classroom.local` | `password123` | sys_admin |

Verify: `npm run verify:demo`

## Environment variables

Copy [`.env.example`](.env.example) to `.env` and set:

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — random 32+ byte secret for sessions
- `QR_SIGNING_SECRET` — random secret for event QR tokens
- `STRIPE_*` — optional; ledger works without Stripe
- `UPSTASH_*` — optional; rate limiting falls back to in-memory locally

Never commit `.env` or real API keys.

## Docker

```bash
docker compose up --build
```

## API (v1)

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/chapters/events/attendance-checkin` | Ambassador QR check-in |
| `POST` | `/api/v1/governance/ambassador/apply-vetting` | Vetting application |
| `GET` | `/api/v1/registry/anonymous-search` | Enterprise anonymized search |
| `POST` | `/api/v1/billing/placement-invoice` | Wakalah placement fee |
| `POST` | `/api/v1/events/register` | Public event registration |
| `GET` | `/api/health` | Health + database connectivity |

## Security

- Passwords stored as Argon2id hashes; sessions use HTTP-only JWT cookies.
- Role-based access on `/candidate`, `/ambassador`, and `/enterprise` routes.
- Enterprise registry returns anonymized metrics only (no names/photos in search).
- Wakalah ledger rejects interest/late-fee fields at the API layer.
- Rate limiting: 100 requests/minute per user (Upstash Redis in production, in-memory fallback locally).

Report security issues privately to the repository owner — do not open public issues for vulnerabilities.

## Project layout

- `src/app/` — routes and API handlers
- `src/server/` — domain logic (curriculum, registry, billing, events)
- `prisma/` — schema, migrations, seed
- `tests/` — Vitest unit and integration tests

Internal runbooks and agent context files are intentionally **not** in this repository (`docs/`, `AGENTS.md`, etc. are gitignored for local use only).

## CI

GitHub Actions runs lint, coverage, migrations, seed, and demo-account verification on each push to `main`.
