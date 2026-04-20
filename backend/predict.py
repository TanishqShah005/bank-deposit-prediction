import pickle
from preprocessing import preprocess_input

import os

def load_artifacts(filepath='model.pkl'):
    """Loads the trained model and preprocessing artifacts."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    full_path = os.path.join(base_dir, filepath)
    with open(full_path, 'rb') as f:
        artifacts = pickle.load(f)
    return artifacts

def make_prediction(data: dict, artifacts: dict):
    """Makes a prediction based on input data and loaded artifacts."""
    X_processed = preprocess_input(data, artifacts)
    
    model = artifacts['model']
    le = artifacts['label_encoder']
    
    prediction_encoded = model.predict(X_processed)[0]
    prediction = le.inverse_transform([prediction_encoded])[0]
    
    # Get probability for 'yes'
    # Find the index of 'yes' in the label encoder classes
    if 'yes' in le.classes_:
        yes_index = list(le.classes_).index('yes')
        probability = model.predict_proba(X_processed)[0][yes_index]
    else:
        probability = 0.0
        
    return {
        'prediction': prediction,
        'probability': float(probability)
    }
