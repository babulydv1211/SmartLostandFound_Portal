# Smart Lost & Found AI Service

## Overview
FastAPI microservice providing multimodal similarity scoring for Smart Lost & Found Portal. Combines Sentence-BERT text embeddings with ResNet50 image embeddings and exposes `/match` and `/batch-match` endpoints.

## Running locally
\`\`\`bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn api:app --reload --port 8000
\`\`\`

Set environment variable `UVICORN_CMD='uvicorn api:app --host 0.0.0.0 --port 8000'` when deploying to Render/HuggingFace Spaces.

Input payloads expect base64 encoded image strings (including the data URI prefix).
