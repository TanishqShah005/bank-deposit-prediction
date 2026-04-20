import numpy as np
import pandas as pd

def preprocess_input(data: dict, artifacts: dict):
    """
    Preprocesses the raw input dictionary into a scaled numpy array 
    ready for model prediction using the loaded artifacts.
    """
    df = pd.DataFrame([data])
    
    num_cols = artifacts['numerical_cols']
    cat_cols = artifacts['categorical_cols']
    
    # Ensure columns exist in input, fill with NaN if missing
    for col in num_cols + cat_cols:
        if col not in df.columns:
            df[col] = np.nan
            
    # Apply Imputers
    df[num_cols] = artifacts['num_imp'].transform(df[num_cols])
    df[cat_cols] = artifacts['cat_imp'].transform(df[cat_cols])
    
    # Encode categorical features
    X_cat_encoded = artifacts['encoder'].transform(df[cat_cols])
    
    # Combine numerical and categorical features
    X_num = df[num_cols].values
    X_combined = np.hstack((X_num, X_cat_encoded))
    
    # Apply Scaler
    X_scaled = artifacts['scaler'].transform(X_combined)
    
    return X_scaled
