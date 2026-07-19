# CAF platform case-study facts

## Problem

CAF is a Spanish-language digital platform for coordinating family-support operations across case intake and tracking, appointments, staff and client records, offices, reporting, notifications, public-site content, documents, and a client-facing mobile experience. The repository positions the administrative portal as the operational workspace and the Go API as the shared system of record.

Evidence: `README.md`, `api/README.md`, `admin-portal/README.md`, `client-app/README.md`, and `marketing/README.md`.

## Users

The code defines seven valid roles: administrator, office manager, lawyer, psychologist, receptionist, event coordinator, and client. Permissions include all-office versus office-scoped access, professional-document boundaries, role-specific navigation, and ownership checks for client routes.

Evidence: `api/config/roles.go`, `api/cmd/server/main.go`, `api/middleware/`, and `admin-portal/src/config/roles.ts`.

## Bryan's role and ownership

Repository history at the captured commit contains 439 commits: 405 attributed to `BryanPMX` and 34 to `Bryan Perez`, both using the same email address. This supports the statement that Bryan was the repository's principal recorded implementer across the captured history.

The exact organizational title, employment relationship, product ownership boundary, and whether every commit reflects solely Bryan's work are **unverified - do not publish** without Bryan's confirmation.

## Team context

No additional Git author identity appears in `git shortlog -sne HEAD`. Some migration files use the author label “CAF System Team,” but the repository does not document team size, review roles, design contributors, or stakeholder responsibilities.

Team size and “solo project” wording are **unverified - do not publish**.

## Timeline

- Earliest captured repository commit: 2025-07-06 (`ca5eee8041e073284f4d2b248de87fddd84c344b`).
- Source commit used for capture: 2026-04-06 (`3893841d8a7c4d8d9eee69724ce0f71c7135a50a`).
- Evidence capture: 2026-07-18 (America/Denver).

This verifies repository activity across those dates; it does not prove the full product or engagement timeline.

## Constraints

- Spanish-language operational UI.
- Sensitive legal/family-support domain requires strict separation of staff-only and client-visible information.
- Multi-office and multi-role access control.
- Shared API for the admin portal, marketing integration, and Flutter client app.
- The checked-in deployment Compose file is production-oriented and not a safe local-development stack; the README's referenced development Compose file is absent.
- External integrations exist for S3-compatible storage, Stripe Checkout/webhooks, Cloudflare Turnstile, and WebSockets, but evidence capture had to remain fully local.

## Architecture

- Go/Gin API with GORM and PostgreSQL.
- Versioned, checksum-tracked, transaction-wrapped SQL migrations.
- Repository/service/container layers and dependency injection for core case, appointment, dashboard, office, and user domains.
- Strategy-pattern file storage with S3 and local filesystem implementations behind `FileStorage`.
- Next.js 14 App Router admin portal with TypeScript, Ant Design, Tailwind, contexts, services, and custom hooks.
- Flutter client application using Provider/ChangeNotifier, secure token storage, client-safe API routes, WebSockets, and hosted Stripe Checkout.
- SvelteKit marketing site with server-side public API proxies, contact validation, and Stripe return bridges.
- Per-user notification WebSocket endpoint at `/ws`.

Evidence: root and component READMEs plus `api/cmd/server/main.go`, `api/container/`, `api/interfaces/`, `api/repositories/`, `api/services/`, `api/storage/`, and frontend source trees.

## Key decisions and alternatives considered

- Stateless JWT authentication replaced the prior session-service path; the server explicitly logs that the session service is deprecated.
- Custom versioned migrations replaced automatic schema migration to preserve ordering and handle views and legacy upgrades.
- File handling depends on a `FileStorage` interface; S3 and local filesystem are interchangeable implementations rather than hard-coded handler dependencies.
- Stripe secrets and Checkout-session creation remain server-side; the mobile client receives hosted checkout URLs rather than secret keys.
- Data access is split across public, staff/admin, office-manager, and client route groups, with client ownership enforcement.
- Redis is an explicit future/optional alternative in the performance handler; the captured server instantiates it with `nil`.

Evidence: `api/cmd/server/main.go`, `api/db/postgres.go`, `api/db/migration_manager.go`, `api/storage/`, `api/handlers/client_payments.go`, and `api/README.md`.

## Security and privacy

- JWT authentication, role middleware, office/department data-access middleware, and client denial on staff APIs.
- Client routes enforce case, appointment, document, and payment ownership boundaries.
- Internal versus client-visible timeline events are explicit in both the API model and UI.
- Passwords use bcrypt hashes.
- Configurable CORS and layered rate limiters cover general, authentication, contact, and admin traffic.
- Flutter uses secure storage for JWTs; the admin portal documents browser localStorage, which has a different threat profile and should not be described as HttpOnly-cookie security.
- Contact submissions use a server-side Turnstile verification path before backend forwarding.
- Stripe webhook signing and payment persistence are implemented server-side.

Security issue found during review: `api/cmd/server/main.go` registers `/api/v1/admin/appointments/fix-categories` directly on the root router and comments that it is temporarily unauthenticated. This should be removed or placed behind admin authentication before presenting the platform as fully hardened.

## Failure handling and recovery

- Appointment creation uses a database transaction and deferred rollback.
- Migrations run transactionally and record checksums/status.
- The API provides live, ready, migration, storage, cache, and version endpoints.
- Document storage is intended to fall back to the local filesystem if S3 is unavailable.
- The server configures graceful HTTP shutdown.
- Frontend error boundaries and API error handling provide user-facing failure states.
- Archive/restore endpoints support recovery for cases and appointments.

Capture finding: with no AWS variables, `InitS3()` still initialized the default AWS credential/endpoint chain before fallback. Capture pinned `AWS_ENDPOINT_URL` to a closed loopback port with dummy credentials to guarantee no external request. An explicit `STORAGE_BACKEND=local` switch would be safer and faster.

## Testing, CI/CD, observability, and evaluation

Verified on 2026-07-18 in Docker:

- `go test ./...` passed for all Go packages; `api/storage` executed its tests successfully.
- `next build` completed successfully and generated 16 application routes. It reported React Hook dependency warnings and two `<img>` optimization warnings, but no build error.
- API health, readiness, 21 migration statuses, and local storage health returned success.
- Accepted production-mode browser frames had no broken images, loading skeletons, or flow-relevant console errors.

Repository smoke suite result: 9 of 15 checks passed. Six checks failed because the suite expects S3 even when the supported local backend is active and expects raw arrays while current endpoints return wrapped response objects. Before that run, `npm ci` also rejected an out-of-sync `testing/package-lock.json`; the suite could run only after `npm install` in a disposable container.

CI evidence: `.github/workflows/build-dockerhub.yml` builds and pushes the API image on relevant `main` changes. No checked-in workflow that runs the Go, admin, Flutter, or Node smoke tests was found.

Observability evidence is limited to structured application logs, health endpoints, cache/performance endpoints, and notification WebSockets. No external metrics, tracing, error-monitoring, or alerting service was verified.

## Scale and verified results

Verified technical counts:

- 439 Git commits at the source commit, all attributed to Bryan's two recorded identities.
- 21 database migrations discovered and applied in the disposable database.
- 16 Next.js application routes in the successful production build.
- 9 of 15 repository smoke checks passed against the local stack; 6 contract/configuration checks failed as described above.

The captured dashboard numbers (two clients, two cases, one appointment) are fictional local demo data and must never be presented as adoption or production scale.

Users served, organizations served, revenue, conversion, uptime, latency, throughput, production data volume, and business impact are **unverified - do not publish**.

## Lessons

Capture-derived engineering lessons, not a quote from Bryan:

- Local and production bootstrap paths need separate, checked-in, regularly tested Compose definitions.
- Supported storage fallbacks must be reflected in health checks and smoke-test assertions.
- Contract tests should validate the current wrapped pagination response shapes.
- Production builds can avoid development-only hot-reload defects, but both paths should be continuously verified.
- A portfolio evidence pass is also a useful privacy and operational-readiness audit.

Bryan's personal retrospective is **unverified - do not publish as his words**.

## What Bryan would improve next

Recommended next work, not a verified statement from Bryan:

1. Protect or remove the unauthenticated appointment category-fix route.
2. Add an explicit local-storage selection that never initializes AWS.
3. Restore a safe development Compose stack and align the README with checked-in files.
4. Synchronize the testing lockfile and update smoke assertions for response envelopes and local storage.
5. Turn build warnings into enforced lint/type checks and add tests to CI.
6. Replace the default seed password and clearly gate seed data to local development.
7. Add tracing/error monitoring and document production SLOs only after measurement.

## Repository or live-demo links

- Repository: <https://github.com/BryanPMX/CAF>
- Documented marketing domain: <https://www.caf-mexico.com> — **not verified during this capture**.
- Documented admin/API production domains appear in configuration, but were deliberately not contacted during capture.

## Confidentiality and redaction notes

- All visible case, client, staff, contact, docket, court, and timeline content is obviously fictional local seed data.
- Fictional email addresses use the reserved `.test` domain and do not appear in the final screenshots.
- No production database, API, S3 bucket, Stripe account, Turnstile service, live domain, or real customer record was used.
- No token, password, environment secret, local filesystem path, local/internal URL, browser chrome, or account identifier appears in the final media.
- No crop or content redaction was required. Images were compressed to WebP and normalized from 1592×995 browser capture bounds to 1600×1000.
