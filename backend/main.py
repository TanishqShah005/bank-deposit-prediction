from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import predict
import traceback

app = FastAPI(title="Bank Deposit Prediction API")

# Setup CORS to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load artifacts once when starting the server
load_error = None
try:
    artifacts = predict.load_artifacts('model.pkl')
    print(f"Loaded artifacts successfully. Model: {artifacts.get('model_name', 'Unknown')}")
except Exception as e:
    load_error = traceback.format_exc()
    print(f"Error loading artifacts:\n{load_error}")
    artifacts = None

class CustomerData(BaseModel):
    age: int
    job: str
    marital: str
    education: str
    default: str
    balance: float
    housing: str
    loan: str
    contact: str
    day: int
    month: str
    duration: float
    campaign: int
    pdays: int
    previous: int
    poutcome: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Bank Deposit Prediction API"}

@app.post("/predict")
def make_prediction(data: CustomerData):
    if artifacts is None:
        error_msg = f"Model artifacts not loaded. Details: {load_error}" if load_error else "Model artifacts not loaded."
        raise HTTPException(status_code=500, detail=error_msg)
        
    try:
        # Convert pydantic model to dict
        input_data = data.model_dump()
        result = predict.make_prediction(input_data, artifacts)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
