// controllers/facultyController
import { spawn } from "child_process";
import Quiz from "../models/quizModel.js";

export const generateQuiz = async (req, res) => {
  const { title, numQuestions, difficulty, questionType, createdBy } = req.body;
  const pdfPath = req.file.path;

  try {
    // Spawn Python process for NLP generation
    const python = spawn("python3", [
      "ml/generate_quiz.py",
      pdfPath,
      numQuestions,
      difficulty,
      questionType,
    ]);

    let output = "";
    python.stdout.on("data", (data) => (output += data.toString()));

    python.on("close", async () => {
      const questions = JSON.parse(output);

      const quiz = new Quiz({
        title,
        createdBy,
        questions,
        difficulty,
        questionType,
      });

      await quiz.save();
      res.json({ quizId: quiz._id, message: "Quiz generated successfully" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
