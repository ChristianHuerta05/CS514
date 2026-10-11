# Chunk 2 API: Events & Venues

Spec for frontend dev; backend is in progress. Base URL: `http://localhost:8001`.

## Conventions
- JSON in and out; field names are `snake_case`.
- Timestamps are ISO 8601 strings (`2026-12-01T19:30:00`).
- Lists return a bare JSON array.
- Errors return `{"error": "message"}` with status 400 (bad input), 404 (not found) or 409 (conflict).
- No auth yet; write endpoints are open for now.

## Shapes

**Venue**: `{ "id": 1, "name": "Red Rocks", "city": "Morrison", "capacity": 9500 }`

**Event** (list item): `{ "id": 1, "title": "...", "starts_at": "...", "onsale_at": "...", "venue": { Venue } }`

**Ticket type** (inside event detail): `{ "id": 1, "name": "GA", "price": 49.50, "quantity_total": 500, "quantity_sold": 120, "remaining": 380 }`

## Venues

### `GET /venues`
All venues. Returns `[Venue]`.

### `POST /venues`
Body: `name` (required), `city` (required), `capacity` (required, int > 0). Returns 201 + `Venue`. 400 if invalid.

## Events

### `GET /events`
All events, including past ones; filter client-side if needed. Returns `[Event]`.
Optional query params:
- `city`: exact match on the venue's city.
- `from`, `to`: ISO dates; keeps events whose `starts_at` is in the range (inclusive).

### `GET /events/:id`
One event with its venue and tiers. Returns `Event` plus `"ticket_types": [Ticket type]`. 404 if missing.
`remaining` = `quantity_total - quantity_sold`.

### `POST /events`
Body: `venue_id` (required, must exist), `title` (required), `starts_at` (required), `onsale_at` (optional). Returns 201 + `Event`. 400 if invalid or the venue is missing.

### `PATCH /events/:id`
Body: any of `venue_id`, `title`, `starts_at`, `onsale_at`; omitted fields are unchanged. Returns 200 + `Event`. 400 if invalid, 404 if missing.

### `DELETE /events/:id`
Returns 204. 409 if the event has ticket types or orders. 404 if missing.