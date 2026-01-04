import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os
from typing import List, Dict
import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os

# --- 1. Initialize FastAPI ---
app = FastAPI(title="MountainGuard AI Engine", version="2.0.0")

# --- 2. Define Data Schemas for the Frontend Sliders ---
class SimulationInput(BaseModel):
    lat: float
    lon: float
    rainfall_intensity: float    # mm/hr
    duration_hours: int
    soil_moisture: float         # 0.0 - 1.0 (normalized)
    slope_angle: float           # Degrees (0-90)
    # Add more features for ML heavy prediction if available from frontend
    elevation: float = 0         # Meters (default for now)
    drainage_density: float = 0  # e.g., km/km^2 (default for now)

class BatchSimulationInput(BaseModel):
    locations: List[SimulationInput]

# --- 3. Mock & Pre-train Model Setup (using joblib for persistence) ---

# Define paths for models and scalers
MODEL_DIR = "ml_models"
os.makedirs(MODEL_DIR, exist_ok=True) # Ensure directory exists

LANDSLIDE_MODEL_PATH = os.path.join(MODEL_DIR, "landslide_classifier.joblib")
FLOOD_MODEL_PATH = os.path.join(MODEL_DIR, "flood_regressor.joblib")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.joblib")


# Function to train and save dummy models if they don't exist
def train_and_save_dummy_models():
    print("Checking for pre-trained models...")
    if not os.path.exists(LANDSLIDE_MODEL_PATH) or \
       not os.path.exists(FLOOD_MODEL_PATH) or \
       not os.path.exists(SCALER_PATH):
        print("Pre-trained models not found. Training dummy models...")

        # Landslide Classifier: Predicts High/Low susceptibility
        # Features: soil_moisture, slope_angle, rainfall_intensity, elevation, drainage_density
        X_landslide = pd.DataFrame({
            'soil_moisture': np.random.rand(100) * 0.8 + 0.1, # 0.1 to 0.9
            'slope_angle': np.random.rand(100) * 50 + 5, # 5 to 55 degrees
            'rainfall_intensity': np.random.rand(100) * 100 + 10, # 10 to 110 mm/hr
            'elevation': np.random.rand(100) * 3000 + 500, # 500 to 3500m
            'drainage_density': np.random.rand(100) * 2 + 0.5 # 0.5 to 2.5
        })
        # Dummy target: High risk if slope and rainfall are high, or soil is saturated
        y_landslide = ((X_landslide['slope_angle'] > 30) & (X_landslide['rainfall_intensity'] > 60) |
                       (X_landslide['soil_moisture'] > 0.8)).astype(int)

        landslide_clf = RandomForestClassifier(n_estimators=100, random_state=42)
        landslide_clf.fit(X_landslide, y_landslide)
        joblib.dump(landslide_clf, LANDSLIDE_MODEL_PATH)
        print("Landslide Classifier trained and saved.")

        # Flood Regressor: Predicts a flood risk score (0-100)
        # Features: rainfall_intensity, duration_hours, elevation, drainage_density
        X_flood = pd.DataFrame({
            'rainfall_intensity': np.random.rand(100) * 150 + 20, # 20 to 170 mm/hr
            'duration_hours': np.random.randint(1, 72, 100),
            'elevation': np.random.rand(100) * 1000 + 100, # 100 to 1100m (lower elevation for floods)
            'drainage_density': np.random.rand(100) * 3 + 1 # 1 to 4
        })
        # Dummy target: Flood risk increases with rainfall, duration, and lower elevation/drainage
        y_flood = (X_flood['rainfall_intensity'] * X_flood['duration_hours'] / 5 +
                   (1000 - X_flood['elevation']) / 20 +
                   X_flood['drainage_density'] * 5).apply(lambda x: min(100, x))

        flood_regressor = RandomForestRegressor(n_estimators=100, random_state=42)
        flood_regressor.fit(X_flood, y_flood)
        joblib.dump(flood_regressor, FLOOD_MODEL_PATH)
        print("Flood Regressor trained and saved.")

        # Scaler for consistent input processing

# --- 4. Logic for Prediction Engine ---
class HazardModel:
    def __init__(self):
        # Load the pre-trained artifacts we saved in Part 1
        try:
            self.landslide_clf = joblib.load(LANDSLIDE_MODEL_PATH)
            self.flood_reg = joblib.load(FLOOD_MODEL_PATH)
            print("AI Engine: All models loaded successfully.")
        except Exception as e:
            print(f"Error loading models: {e}. Ensure Part 1 training ran.")
            # Fallback to dummy logic if files are missing
            self.landslide_clf = None
            self.flood_reg = None

    def predict(self, data: SimulationInput):
        # 1. Prepare Features for Landslide (5 features)
        ls_features = np.array([[
            data.soil_moisture, 
            data.slope_angle, 
            data.rainfall_intensity, 
            data.elevation, 
            data.drainage_density
        ]])
        
        # 2. Prepare Features for Flood (4 features)
        fl_features = np.array([[
            data.rainfall_intensity, 
            data.duration_hours, 
            data.elevation, 
            data.drainage_density
        ]])

        # 3. Run Inference
        if self.landslide_clf and self.flood_reg:
            # Classification gives us probability (0 to 100%)
            ls_prob = self.landslide_clf.predict_proba(ls_features)[0][1] * 100
            # Regression gives us a predicted risk score
            fl_score = self.flood_reg.predict(fl_features)[0]
        else:
            # Heuristic fallback if ML models aren't ready
            ls_prob = (data.slope_angle / 60) * (data.rainfall_intensity / 100) * 100
            fl_score = (data.rainfall_intensity * data.duration_hours) / 10

        # 4. Calculate Final Alert Level
        max_risk = max(ls_prob, fl_score)
        if max_risk > 80:
            level, advice = "RED", "IMMEDIATE EVACUATION REQUIRED. High probability of mass movement."
        elif max_risk > 50:
            level, advice = "YELLOW", "CAUTION: Monitor local drainage and avoid steep slopes."
        else:
            level, advice = "GREEN", "Normal status. No significant risk detected."

        return {
            "landslide_risk": round(float(ls_prob), 2),
            "flood_risk": round(float(fl_score), 2),
            "alert_level": level,
            "recommendation": advice
        }

# Initialize the engine
engine = HazardModel()

# --- 5. API Endpoints ---

@app.post("/simulate")
async def simulate_hazard(input_data: SimulationInput):
    """
    Core ML Endpoint: Takes sensor/simulation data and returns 
    multi-hazard risk assessments using pre-trained RF models.
    """
    try:
        results = engine.predict(input_data)
        return {
            "status": "success",
            "location": {"lat": input_data.lat, "lon": input_data.lon},
            "results": results
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "online", "models_loaded": engine.landslide_clf is not None}

# Run with: uvicorn main:app --reload
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# 1. Mount the 'static' folder to serve CSS/JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# 2. Serve index.html at the root URL
@app.get("/")
async def read_index():
    return FileResponse('static/index.html')