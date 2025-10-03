import base64
import io
from PIL import Image

def decode_image(base64_string: str):
    header, _, encoded = base64_string.partition(",")
    image_bytes = base64.b64decode(encoded if encoded else header)
    return Image.open(io.BytesIO(image_bytes)).convert("RGB")
