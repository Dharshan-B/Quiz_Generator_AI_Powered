import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  quizId: { type: String, required: true },
  quizTitle: { type: String, required: true },
  answers: [
    {
      question: String,
      selected: String,
      correctAnswer: String,
      correct: Boolean,
    }
  ],
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  attemptedAt: { type: Date, default: Date.now },
});

export default mongoose.model("QuizResult", quizResultSchema);
