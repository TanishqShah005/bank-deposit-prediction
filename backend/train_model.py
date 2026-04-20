import pandas as pd
import numpy as np
import pickle
import os
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

def train():
    print("Loading dataset...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, 'bank.csv')
    df = pd.read_csv(csv_path)
    
    categorical_cols = df.select_dtypes(include=['object']).columns.tolist()
    numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    
    if 'deposit' in categorical_cols:
        categorical_cols.remove('deposit')
    
    print("Applying imputation...")
    num_imp = SimpleImputer(strategy="mean")
    df[numerical_cols] = num_imp.fit_transform(df[numerical_cols])
    
    cat_imp = SimpleImputer(strategy="most_frequent")
    df[categorical_cols] = cat_imp.fit_transform(df[categorical_cols])
    
    X = df.drop(['deposit'], axis=1)
    y = df['deposit']
    
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    print("Encoding categorical features...")
    encoder = OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore')
    # Fit transform categories
    X_cat_encoded = encoder.fit_transform(X[categorical_cols])
    
    # Combine numerical and categorical
    X_num = X[numerical_cols].values
    X_combined = np.hstack((X_num, X_cat_encoded))
    
    print("Scaling features...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_combined)
    
    X_train, X_test, y_train, y_test = train_test_split(X_scaled, y_encoded, test_size=0.2, random_state=42)
    
    models = {
        'KNN': KNeighborsClassifier(n_neighbors=5),
        'Decision Tree': DecisionTreeClassifier(random_state=42),
        'Naive Bayes': GaussianNB(),
        'SVM': SVC(probability=True, random_state=42)
    }
    
    best_model = None
    best_acc = 0
    best_name = ""
    
    print("Training models...")
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        print(f"{name} Accuracy: {acc:.4f}")
        
        if acc > best_acc:
            best_acc = acc
            best_model = model
            best_name = name
            
    print(f"\nBest Model Selected: {best_name} with Accuracy: {best_acc:.4f}")
    
    artifacts = {
        'model': best_model,
        'model_name': best_name,
        'scaler': scaler,
        'encoder': encoder,
        'num_imp': num_imp,
        'cat_imp': cat_imp,
        'numerical_cols': numerical_cols,
        'categorical_cols': categorical_cols,
        'label_encoder': le
    }
    
    model_path = os.path.join(base_dir, 'model.pkl')
    with open(model_path, 'wb') as f:
        pickle.dump(artifacts, f)
    print("Model and preprocessing artifacts saved to model.pkl successfully.")

if __name__ == "__main__":
    train()
