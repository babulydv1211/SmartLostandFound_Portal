# Architecture Overview

## High-level diagram
\`\`\`
[Frontend (React/Vite)]
      |
      v
[Backend API (Express)] -- MongoDB Atlas
      |
      v
[AI Microservice (FastAPI)]
\`\`\`

- **Frontend** handles user flows, authentication tokens, forms, and dashboards.
- **Backend** manages auth, persistence, AI orchestration, and notifications.
- **AI Service** computes similarity leveraging transformer-based text embeddings and CNN image features.

## Authentication Flow
1. User signs up/logs in through frontend.
2. Backend returns JWT token; stored in browser `localStorage`.
3. Protected routes require `Authorization` header.

## Data Flow
- Reports stored in `lost_items` or `found_items` (single `items` collection with `type`).
- AI service responses enriched into records with `matchConfidence`.

## Notification Flow
1. After AI returns match ≥ 80%, backend triggers Nodemailer.
2. Email informs both students with report metadata to coordinate pickup.

## Technology Choices
- **React Router** for SPA navigation.
- **Framer Motion** for micro interactions.
- **SW**R/React Query for data caching.
- **SentenceTransformer + ResNet50** for robust similarities.

## Security Considerations
- JWT token expiration set to 7 days.
- Passwords hashed with bcrypt.
- Image payloads limited (10MB) and handled as base64 strings.
- CORS restricted to configured frontend URLs.
