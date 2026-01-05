# Backend - Kavach

FastAPI backend for Kavach with ML models for disaster prediction.

## Setup

1. Create virtual environment:
```bash
python -m venv myenv
```

2. Activate virtual environment:
```bash
# Windows
myenv\Scripts\activate

# Linux/Mac
source myenv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file with your environment variables

5. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## ML Models

The `ml_models/` directory contains:
- `flood_regressor.joblib` - Flood prediction model
- `landslide_classifier.joblib` - Landslide classification model
