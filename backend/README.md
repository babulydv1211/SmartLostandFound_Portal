# Smart Lost & Found Portal – Backend

## Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
npm run dev
\`\`\`

Required environment variables:
- `MONGO_URI`
- `JWT_SECRET_KEY`
- `AIML_SERVICE_URL`
- `FRONTEND_URL`
- `EMAIL_USER`, `EMAIL_PASSWORD` (optional for email notifications)

## REST endpoints
See `../docs/API.md` for the full specification.

The server will run on port `4000` by default.
