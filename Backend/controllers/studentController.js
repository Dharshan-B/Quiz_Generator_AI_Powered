import Quiz from "../models/quizModel.js";

// Get all public quizzes
export const getPublicQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublic: true }).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    console.error("Failed to fetch public quizzes:", err);
    res.status(500).json({ message: "Failed to fetch public quizzes", error: err.message });
  }
};

// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    console.error("Failed to fetch quiz:", err);
    res.status(500).json({ message: "Failed to fetch quiz", error: err.message });
  }
};

// Submit quiz answers
export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    const quiz = await Quiz.findById(id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] && answers[index] === q.answer) {
        score += 1;
      }
    });

    // You could also store student's attempt here if needed
    res.json({ score });
  } catch (err) {
    console.error("Failed to submit quiz:", err);
    res.status(500).json({ message: "Failed to submit quiz", error: err.message });
  }
};
