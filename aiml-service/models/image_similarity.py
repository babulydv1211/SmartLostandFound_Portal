import torch
from torchvision import models, transforms
from sklearn.metrics.pairwise import cosine_similarity

_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
_model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
_model.fc = torch.nn.Identity()
_model = _model.to(_device)
_model.eval()

_preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

@torch.no_grad()
def compute_image_similarity(image_a, image_b) -> float:
    tensor_a = _preprocess(image_a).unsqueeze(0).to(_device)
    tensor_b = _preprocess(image_b).unsqueeze(0).to(_device)

    embedding_a = _model(tensor_a).cpu().numpy()
    embedding_b = _model(tensor_b).cpu().numpy()

    similarity = cosine_similarity(embedding_a, embedding_b)[0][0]
    return float(similarity)
