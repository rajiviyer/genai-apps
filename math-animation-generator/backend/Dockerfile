# Dockerfile for backend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies for cairo
RUN apt-get update && apt-get install -y \
    libcairo2 \
    libcairo2-dev \
    libpango1.0-0 \
    libpangocairo-1.0-0 \
    libsdl-pango-dev \
    texlive \
    texlive-latex-extra \
    gcc \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*


COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8902"]