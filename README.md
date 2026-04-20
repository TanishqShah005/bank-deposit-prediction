# Bank Deposit Prediction Application

A full-stack predictive analytics web application designed to forecast term deposit subscriptions based on customer demographics and financial indicators.

## Architecture

- **Backend**: FastAPI, Scikit-Learn, Pandas.
- **Frontend**: React (Vite), Tailwind CSS, Recharts, Lucide React.
- **Model**: Support Vector Machine (SVM) (83.65% Accuracy).

## Project Structure

```text
bank-deposit-prediction/
├── backend/
│   ├── main.py                # FastAPI Application
│   ├── train_model.py         # Script to train and save models
│   ├── predict.py             # Inference helper functions
│   ├── preprocessing.py       # Data transformation pipeline
│   ├── model.pkl              # Saved models, encoders, scalers
│   ├── bank.csv               # Dataset
│   └── requirements.txt       # Backend dependencies
├── frontend/                  # React Application (Vite)
│   ├── src/                   # Components, Pages, Assets
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.js     # Tailwind Configuration
│   └── vite.config.js         # Vite Configuration
└── README.md
```

## Running Locally

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd bank-deposit-prediction/backend
   ```
2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Generate the `model.pkl` (if not already present):
   ```bash
   python train_model.py
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   The backend API will be running at `http://localhost:8000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd bank-deposit-prediction/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`.

---

## Deployment Guide

We recommend deploying the **Frontend to Vercel** and the **Backend to Render**.

### Deploying the Backend to Render

1. Create a free account on [Render](https://render.com/).
2. Push this entire repository to GitHub.
3. On Render, click "New" -> "Web Service" and connect your GitHub repository.
4. Set the following configurations:
   - **Root Directory**: `backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Create Web Service**. Wait a few minutes, and you will get a live URL (e.g., `https://bank-api-xyz.onrender.com`).

### Deploying the Frontend to Vercel

1. **Update API URL**: In `frontend/src/pages/Prediction.jsx`, change the `http://localhost:8000/predict` URL to your Render API URL.
2. Push your changes to GitHub.
3. Create a free account on [Vercel](https://vercel.com/).
4. Click "Add New..." -> "Project" and import your GitHub repository.
5. Set the following configurations:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Vercel will build and host your application, providing you with a live URL.

## Features Included
- High-performance FastAPI Inference Endpoint
- Automatic selection of the best ML Model
- Fully Responsive, Glassmorphic UI with Tailwind CSS
- Interactive Data Visualizations using Recharts
- Dark / Light Mode System
- "Download Prediction Result" as PNG Image
