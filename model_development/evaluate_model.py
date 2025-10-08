import joblib
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import pandas as pd

def evaluate_model():
    # Load model
    model = joblib.load("model/quiz_difficulty_model.pkl")

    # Sample multilingual test data
    test_data = pd.DataFrame({
        "question_text": [
            "What is an array?",
            "¿Qué es un bucle for?",
            "Explain supervised learning.",
            "தமிழில் 'மரம்' என்றால் என்ன?",
            "Wie funktioniert eine Schleife in Python?"
        ],
        "difficulty": ["easy", "medium", "medium", "easy", "medium"]
    })

    y_true = test_data["difficulty"]
    y_pred = model.predict(test_data["question_text"])

    print("Predicted Difficulties:", list(y_pred))
    print("\nClassification Report:\n", classification_report(y_true, y_pred))

if __name__ == "__main__":
    evaluate_model()
