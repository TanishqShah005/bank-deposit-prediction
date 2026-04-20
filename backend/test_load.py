import pickle
import traceback

try:
    with open('model.pkl', 'rb') as f:
        artifacts = pickle.load(f)
    print('Success')
except Exception as e:
    traceback.print_exc()
