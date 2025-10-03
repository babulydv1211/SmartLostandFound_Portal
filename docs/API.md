# API Reference

Base URL: `https://<backend-domain>`

All endpoints require the `Authorization: Bearer <token>` header unless noted.

## Authentication
### POST `/auth/signup`
Create new user.
- Body: `{ "name": "...", "email": "...", "password": "..." }`
- Response: `{ "token": "...", "user": { "id": "...", "name": "...", "email": "..." } }`

### POST `/auth/login`
Authenticate existing user with email + password.

## Lost & Found
### GET `/items`
List all lost and found records ordered by creation date.
- Response: `{ "items": [ ... ] }`

### POST `/lost`
Submit lost item report. Triggers AI batch match.
- Body: `{ "title", "description", "location", "occurredAt", "image" (base64 optional) }`
- Response: `{ "item": {...}, "confidence": 87.2 }`

### POST `/found`
Submit found item report. Same payload as `/lost`.

### POST `/match`
Manual comparison between one lost and one found payload.

## Comments
### GET `/comments`
Fetch testimonials/comments list.

### POST `/comments`
Add new testimonial.
- Body: `{ "studentName", "message", "course" }`

## AI Microservice
Base URL: `https://<ai-service-domain>`

- `POST /match`: Compare two items.
- `POST /batch-match`: Compare one item against candidate list.

All payloads use the structure documented in `aiml-service/api.py`.
