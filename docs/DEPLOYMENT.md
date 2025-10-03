# Deployment Guide

## Frontend (Vercel)
1. Set `VITE_API_URL` environment variable to your backend URL.
2. Build command: `npm install` then `npm run build` inside `/frontend`.
3. Output directory: `/frontend/dist`.
4. Ensure environment variable is configured in Vercel Project Settings.

## Backend (Render / Google Cloud Run)
1. Install dependencies: `npm install`.
2. Provide environment variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET_KEY`
   - `FRONTEND_URL`
   - `AIML_SERVICE_URL`
   - `EMAIL_*` credentials (optional but required for email notifications)
3. Start command: `node src/index.js`.

## AI Microservice (Render / HuggingFace Spaces)
1. Python runtime 3.10 recommended.
2. Install requirements: `pip install -r aiml-service/requirements.txt`.
3. Start command: `uvicorn api:app --host 0.0.0.0 --port 8000`.
4. Provide GPU if available for faster CNN inference; otherwise CPU fallback works for small throughput.

### Environment Flow
1. A new lost/found report hits `/lost` or `/found`.
2. Backend stores item, calls AI service `/batch-match`.
3. If match score ≥ 80%, backend emails both parties via Nodemailer.

Keep the three services deployed separately, update URLs in environment configs, and ensure CORS allows the frontend origin.
