# Kavach - Disaster Prediction System

Full-stack application for disaster prediction using machine learning, featuring separate backend and frontend for independent deployment.

## Project Structure

```
Kavach/
├── backend/          # FastAPI Python backend
│   ├── main.py       # Main FastAPI application
│   ├── ml_models/    # Pre-trained ML models
│   ├── myenv/        # Python virtual environment
│   ├── requirements.txt
│   └── README.md
│
└── frontend/         # React + Vite frontend
    ├── src/          # React source code
    ├── public/       # Static assets
    ├── package.json
    ├── vite.config.js
    └── README.md
```

## Quick Start

### Backend Setup

```bash
cd backend
python -m venv myenv
myenv\Scripts\activate  # On Windows
# source myenv/bin/activate  # On Linux/Mac
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on: `http://localhost:8000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173` (or as specified by Vite)

## Deployment

- **Backend**: Deploy to services like Railway, Render, AWS EC2, or Google Cloud Run
- **Frontend**: Deploy to Vercel, Netlify, or any static hosting service

## Features

- Machine Learning models for disaster prediction (flood, landslide)
- RESTful API with FastAPI
- Modern React UI with Vite
- Separate deployments for better scalability

## Environment Variables

Create `.env` files in backend and frontend directories as needed for your deployment.

## License

[Your License]
