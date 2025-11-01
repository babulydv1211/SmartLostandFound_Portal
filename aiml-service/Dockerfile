# Use a recent Python base
FROM python:3.10-slim

# Create a non-root user (optional but safer)
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /app

# Copy only requirements first to leverage Docker cache
COPY --chown=user requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy rest of the source
COPY --chown=user . /app

# Expose the port Hugging Face expects
EXPOSE 7860

# Run the app: if your file is main.py and app object is `app`
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860", "--workers", "1"]
