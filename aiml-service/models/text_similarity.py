from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

_model = SentenceTransformer("all-MiniLM-L6-v2")

def compute_text_similarity(description_a: str, description_b: str, location_a: str, location_b: str) -> float:
    texts = [
        f"{description_a} Location: {location_a}",
        f"{description_b} Location: {location_b}"
    ]
    embeddings = _model.encode(texts)
    similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    return float(similarity)
