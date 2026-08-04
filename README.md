# Project Submission Server

Backend for project submission, moderation, showcase and upvote ranking. Built with Express + TypeScript + MongoDB (Mongoose), with thumbnails stored on Cloudflare R2.

## Features

- Public project submission with a tracking reference code (no account required)
- Submission status lookup via reference code
- User registration / login with JWT access tokens
- Authenticated users can create, update and delete their own projects
- Admin moderation workflow (approve / reject, feature projects)
- Public & per-event showcase with sorting and filtering
- Upvoting with per-user upvote state
- Event management (active events public, full CRUD for admins)
- Rate limiting, input validation (Zod), helmet security headers, CORS
- Cloudflare R2 storage for project thumbnails

## Tech Stack

- Node.js >= 20
- Express 4
- TypeScript 5
- MongoDB + Mongoose 8
- Zod (validation)
- JSON Web Tokens (auth)
- Multer (file uploads)
- AWS SDK v3 (Cloudflare R2)
- express-rate-limit, helmet, cors

## Prerequisites

- Node.js >= 20
- MongoDB instance (local or Atlas)
- A Cloudflare R2 bucket with a public base URL

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

### 3. Run

Development (watch mode):

```bash
pnpm run dev
```

Build and start (production):

```bash
pnpm run build
pnpm start
```

The server starts at `http://localhost:5000` (or the `PORT` you set).

### 4. Seed admin & demo event (optional)

```bash
pnpm run seed
```

This creates an admin user (from `SEED_ADMIN_*`) and a demo event using the admin credentials.

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | `development` \| `test` \| `production` | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/project-submission` |
| `JWT_ACCESS_SECRET` | Secret used to sign JWTs (min 16 chars) | — |
| `JWT_ACCESS_EXPIRES_IN` | Access token lifetime, e.g. `7d` | `7d` |
| `REFERENCE_SECRET` | Secret used to derive submission reference codes (min 16 chars) | — |
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID | — |
| `R2_ACCESS_KEY_ID` | Cloudflare R2 access key ID | — |
| `R2_SECRET_ACCESS_KEY` | Cloudflare R2 secret access key | — |
| `R2_BUCKET_NAME` | R2 bucket name | `project-submissions` |
| `R2_PUBLIC_BASE_URL` | Public URL prefix for the bucket, e.g. `https://pub-<hash>.r2.dev` | — |
| `R2_REGION` | R2 region | `auto` |
| `CORS_ORIGINS` | Comma-separated allowed origins (`*` allows all) | `*` |
| `SEED_ADMIN_EMAIL` | Admin email for `npm run seed` | — |
| `SEED_ADMIN_PASSWORD` | Admin password for `npm run seed` | — |
| `SEED_ADMIN_NAME` | Admin display name for `npm run seed` | — |

> **Note:** `JWT_ACCESS_SECRET` and `REFERENCE_SECRET` must be at least 16 characters.

## Authentication

Most routes require a JWT access token:

```
Authorization: Bearer <token>
```

Roles:
- `user` — default role on registration. Can manage own projects and upvote.
- `admin` — can moderate projects, feature projects, and manage events.

`optionalAuthenticate` routes work with or without a token; when a valid token is present the response includes the viewer's upvote state.

## Response Format

Successful responses follow `{ success, message, data }`:

```json
{
  "success": true,
  "message": "Project fetched",
  "data": { ... }
}
```

Errors follow `{ success, message, details? }`:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## Thumbnail Uploads

Project creation/update and public submissions accept a multipart/form-data field named `thumbnail`:

- Required for `POST /api/v1/projects` and `POST /api/v1/submissions`
- Allowed types: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- Max size: 5 MB

## Rate Limits

| Limit | Window | Applied to |
| --- | --- | --- |
| 100 req | 15 min | Global API |
| 10 req | 1 min | Auth endpoints |
| 5 req | 1 hour | Public submissions |
| 30 req | 1 min | Submission status lookup |
| 30 req | 1 min | Upvotes |
| 20 req | 1 hour | Project create/update |
| 30 req | 1 min | Admin endpoints |
| 60 req | 1 min | Read endpoints |

Exceeding a limit returns `429`.

---

## API Reference

Base URL: `http://localhost:5000/api/v1`

### Health

#### `GET /health`
Health check. Returns `200` with `{ success: true, message: "OK" }`.

---

### Auth

#### `POST /auth/register`
Create a new user account.

Body (JSON):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

- `name`: 2–100 chars
- `email`: valid email
- `password`: 8–72 chars

Returns `201` with `{ user: { id, name, email, role, createdAt }, token }`.

Errors: `409` if the email is already registered.

#### `POST /auth/login`
Log in with email and password.

Body (JSON):

```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

Returns `200` with `{ user: { id, name, email, role, createdAt }, token }`.

Errors: `401` on invalid credentials.

---

### Submissions (public, no account required)

#### `POST /submissions`
Submit a project publicly. Requires a thumbnail.

Multipart/form-data fields:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `speakerEmail` | string | yes | valid email |
| `eventId` | string | no | 24-char ObjectId of an active event |
| `title` | string | yes | 3–200 chars |
| `description` | string | yes | 20–5000 chars |
| `demoUrl` | string | no | valid URL or empty |
| `repoUrl` | string | no | valid URL or empty |
| `categories` | JSON array string | yes | 1–10 items, each ≤50 chars |
| `techStack` | JSON array string | yes | 1–20 items, each ≤50 chars |
| `thumbnail` | file | yes | image, ≤5 MB |

`categories` / `techStack` are sent as JSON strings, e.g. `["web","ai"]`.

Returns `201` with `{ referenceCode, phase, message }`. Keep the `referenceCode` to track status.

Errors: `400` if the event is not active or a field is invalid; `429` (limit 5/hour).

Note: Re-submitting identical `eventId + speakerEmail + title` returns the existing submission's reference code instead of creating a duplicate.

#### `GET /submissions/status?referenceCode=XXXX`
Look up a submission's status with its reference code.

Query params:
- `referenceCode` (required): the reference code from a submission.

Returns `200` with:

```json
{
  "referenceCode": "A1B2C3D4E5F6",
  "phase": "under_review",
  "submittedAt": "2026-08-04T...",
  "meta": {
    "title": "...",
    "categories": ["..."],
    "techStack": ["..."],
    "eventId": "64b...",
    "thumbnailUrl": "https://...",
    "submittedAt": "2026-08-04T..."
  }
}
```

Phases: `received` | `under_review` | `approved` | `rejected`.

Errors: `404` if no submission matches the code.

---

### Projects

All project routes require authentication except public reads.

#### `POST /projects`
Create a project. Requires a thumbnail and sets status to `pending`.

Multipart/form-data fields (same rules as submissions):

| Field | Type | Required |
| --- | --- | --- |
| `title` | string | yes |
| `description` | string | yes |
| `demoUrl` | string | no |
| `repoUrl` | string | no |
| `categories` | JSON array string | yes |
| `techStack` | JSON array string | yes |
| `eventId` | string | no |
| `thumbnail` | file | yes |

Returns `201` with the created project object.

#### `GET /projects/:id`
Get a single project. Optional authentication.

Only approved projects are visible to the public. Owners and admins can view their own pending/rejected projects.

Returns `200` with the project (includes `hasUpvoted` when authenticated).

Errors: `404` if not found or not visible.

#### `GET /projects/:id/related`
Get up to 6 related approved projects (shared categories or same event).

Returns `200` with `{ items: [...] }`.

#### `PUT /projects/:id`
Update a project. Owner or admin only. Thumbnail optional (multipart/form-data).

Body accepts any subset of the create fields.

Returns `200` with the updated project.

Errors: `404` if not found; `403` if not the owner and not admin.

#### `DELETE /projects/:id`
Delete a project. Owner or admin only.

Returns `204` with no body.

Errors: `404` if not found; `403` if not the owner and not admin.

---

### Showcase

#### `GET /showcase/global`
Public showcase of approved projects. Optional authentication (adds `hasUpvoted`).

Query params:
- `page` (default `1`)
- `limit` (default `20`, max `50`)
- `sort` — `top` (featured first, then upvotes) or `newest` (default `top`)
- `categories` — comma-separated list
- `techStack` — comma-separated list
- `eventId` — filter by event

Returns `200` with `{ items, page, limit, total, totalPages }`.

#### `GET /showcase/events/:id`
Showcase of approved projects for a specific event. Same query params as `/showcase/global` (no `eventId`).

Returns `200` with the paginated list.

Errors: `404` if the event doesn't exist.

#### `GET /showcase/moderation`
Admin only. Paginated list of all projects with moderation queue totals.

Query params:
- `page`, `limit`
- `status` — `pending` | `approved` | `rejected`
- `eventId`
- `category`

Returns `200` with `{ items, page, limit, total, totalPages, totalsByStatus: { pending, approved, rejected } }`.

#### `PATCH /showcase/moderation/:id`
Admin only. Approve or reject a project.

Body (JSON):

```json
{ "action": "approve" }
```

- `action` must be `approve` or `reject`.

Returns `200` with the updated project.

Errors: `400` for an invalid action.

#### `PATCH /showcase/:id/feature`
Admin only. Feature or unfeature a project.

Body (JSON):

```json
{ "featured": true }
```

- `featured` must be a boolean.

Returns `200` with the updated project.

Errors: `400` if `featured` is not a boolean.

---

### Upvotes

#### `POST /upvotes/projects/:id/upvote`
Toggle an upvote on a project. Authenticated user.

Returns `200` with `{ upvoted: boolean, upvoteCount: number }`.

Errors: `404` if the project doesn't exist.

#### `GET /upvotes/state?ids=id1,id2,id3`
Get the current user's upvote state for a set of projects.

Query params:
- `ids` — comma-separated project IDs.

Returns `200` with a map: `{ "<projectId>": true }`.

---

### Users

#### `GET /users/me/projects`
List the authenticated user's own projects, newest first.

Query params:
- `page` (default `1`)
- `limit` (default `20`, max `50`)

Returns `200` with `{ items, page, limit, total, totalPages }`.

---

### Events

#### `GET /events/active`
Public. List all active events, sorted by start date.

Returns `200` with `{ items: [{ id, name, slug, description, status, startDate, endDate }] }`.

#### `GET /events`
Admin only. Paginated list of all events.

Query params:
- `page`, `limit`
- `status` — `active` | `inactive`

Returns `200` with `{ items, page, limit, total }`.

#### `POST /events`
Admin only. Create an event.

Body (JSON):

```json
{
  "name": "Hackathon 2026",
  "slug": "hackathon-2026",
  "description": "Annual hackathon",
  "status": "active",
  "startDate": "2026-09-01",
  "endDate": "2026-09-03"
}
```

- `name`: 3–150 chars (required)
- `slug`: lowercase kebab-case (required)
- `description`: ≤2000 chars (optional)
- `status`: `active` | `inactive` (default `active`)
- `startDate` / `endDate`: ISO dates (optional)

Returns `201` with the created event.

Errors: `409` if the slug is already in use.

#### `PATCH /events/:id`
Admin only. Update an event. Any subset of create fields.

Returns `200` with the updated event.

Errors: `404` if not found; `409` if the new slug is taken.

---

## Project Object Shape

Most project endpoints return a serialized project:

```json
{
  "id": "64b...",
  "title": "My Project",
  "description": "...",
  "demoUrl": "https://...",
  "repoUrl": "https://...",
  "categories": ["web"],
  "techStack": ["react", "node"],
  "thumbnail": { "key": "thumbnails/...", "url": "https://...", "contentType": "image/png" },
  "upvoteCount": 12,
  "featured": false,
  "status": "approved",
  "source": "authenticated",
  "referenceCode": "A1B2C3D4E5F6",
  "event": { "id": "64b...", "name": "Hackathon", "slug": "hackathon-2026" },
  "author": { "id": "64b...", "name": "Jane Doe" },
  "speakerEmail": "jane@example.com",
  "hasUpvoted": false,
  "createdAt": "2026-08-04T...",
  "updatedAt": "2026-08-04T..."
}
```

`status` values: `pending` | `approved` | `rejected`.
`source` values: `public` | `authenticated`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run in watch mode with tsx |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled output from `dist/` |
| `npm run typecheck` | Type-check without emitting |
| `npm run seed` | Seed admin user and demo event |
