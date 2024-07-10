FROM python:3.11-bookworm

WORKDIR /app

# COPY requirements.txt ./

COPY . .

# Install ffmpeg and other required packages
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8901"]
