from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from models.text_similarity import compute_text_similarity
from models.image_similarity import compute_image_similarity
from utils.preprocessing import decode_image
import uvicorn

app = FastAPI(
    title="Smart Lost & Found AI Service",
    version="1.0.0",
    description="Performs multimodal similarity between lost and found reports."
)

#basemodel pydentic define req,res schemas
#itemspaload api per data send ke ye str hona chaiye
class ItemPayload(BaseModel):
    id: Optional[str]
    title: str
    description: str
    location: str
    occurredAt: str
    image: Optional[str] = None

#match req,lost and found item use basemodel
class MatchRequest(BaseModel):
    lost_item: ItemPayload
    found_item: ItemPayload

class BatchMatchRequest(BaseModel):
    item: ItemPayload
    candidates: List[ItemPayload]

@app.post("/match")
async def match_items(payload: MatchRequest):
    try:
        text_score = compute_text_similarity(
            payload.lost_item.description,
            payload.found_item.description,
            payload.lost_item.location,
            payload.found_item.location,
        )

        image_score = None
        if payload.lost_item.image and payload.found_item.image:
            img_a = decode_image(payload.lost_item.image)
            img_b = decode_image(payload.found_item.image)
            image_score = compute_image_similarity(img_a, img_b)

        score = blend_scores(text_score, image_score)
        return {"score": round(score * 100, 2)}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error

@app.post("/batch-match")
async def batch_match(payload: BatchMatchRequest):
    try:
        results = []
        for candidate in payload.candidates:
            text_score = compute_text_similarity(
                payload.item.description,
                candidate.description,
                payload.item.location,
                candidate.location,
            )
            image_score = None
            if payload.item.image and candidate.image:
                img_a = decode_image(payload.item.image)
                img_b = decode_image(candidate.image)
                image_score = compute_image_similarity(img_a, img_b)

            score = blend_scores(text_score, image_score)
            results.append({
                "id": candidate.id,
                "score": round(score * 100, 2)
            })

        best_match = max(results, key=lambda item: item["score"], default=None)
        return {"matches": results, "bestMatch": best_match}
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error)) from error

def blend_scores(text_score: float, image_score: Optional[float]) -> float:
    if image_score is None:
        return text_score
    return (0.6 * text_score) + (0.4 * image_score)

@app.get("/")
async def root():
    return {"message": "Smart Lost & Found AI Service is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)





