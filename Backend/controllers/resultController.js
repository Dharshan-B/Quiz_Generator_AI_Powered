// controllers/resultController.js
import QuizResult from "../models/quizModel.js";

// Save quiz result
export const saveResult = async (req, res) => {
  try {
    const { studentId, quizId, quizTitle, answers } = req.body;

    if (!studentId || !quizId || !answers) {
      return res.status(400).json({ message: "studentId, quizId, and answers are required" });
    }

    const totalQuestions = answers.length;
    const score = answers.filter(a => a.correct).length;

    const result = new QuizResult({
      studentId,
      quizId,
      quizTitle,
      answers,
      score,
      totalQuestions,
      attemptedAt: new Date(),
    });

    await result.save();
    res.json({ message: "Quiz submitted successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save result", error: err.message });
  }
};

// Get student results
export const getStudentResults = async (req, res) => {
  const { studentId } = req.query;
  if (!studentId) return res.status(400).json({ message: "studentId is required" });

  try {
    const results = await QuizResult.find({ studentId }).sort({ attemptedAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch results", error: err.message });
  }
};
