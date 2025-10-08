import quizModel from "../models/quizModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Quiz from PDF
export const generateQuiz = async (req, res) => {
  try {
    const { title, numQuestions, difficulty, questionType, createdBy } = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const pdfBuffer = req.file.buffer;
    const base64Data = pdfBuffer.toString("base64");

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const prompt = `
      You are a quiz generator.
      Generate ${numQuestions} ${difficulty}-level ${questionType} questions from the PDF content.
      Return the output strictly as JSON array (no extra text, no code formatting) like:
      [
        {
          "question": "...",
          "options": ["A", "B", "C", "D"],
          "answer": "B"
        }
      ]
    `;

    const result = await model.generateContent([
      { inlineData: { mimeType: "application/pdf", data: base64Data } },
      { text: prompt }
    ]);

    let textResponse = result.response.text();
    textResponse = textResponse.replace(/```(json)?/g, "").trim();

    let questions;
    try {
      questions = JSON.parse(textResponse);
    } catch (err) {
      console.error("❌ JSON parse error:", err);
      return res.status(500).json({ message: "Failed to parse generated questions", error: err.message });
    }

    // Save quiz in DB
    const quiz = await quizModel.create({
      title: title || "Untitled Quiz",
      questions,
      createdBy: createdBy || "faculty"
    });

    res.json({ quizId: quiz._id, questions });
  } catch (error) {
    console.error("❌ Error generating quiz:", error);
    res.status(500).json({ message: "Quiz generation failed", error: error.message });
  }
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await quizModel.find().sort({ createdAt: -1 });
    res.json(quizzes); // send as array for frontend map()
  } catch (error) {
    console.error("❌ Error fetching quizzes:", error);
    res.status(500).json({ message: "Failed to fetch quizzes", error: error.message });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await quizModel.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting quiz:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
};

//Quiz Setting
// Update quiz settings
export const updateQuizSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const { timer, startTime, endTime, allowRetry, shuffleQuestions, isPublic } = req.body;

    const updatedQuiz = await quizModel.findByIdAndUpdate(
      id,
      { timer, startTime, endTime, allowRetry, shuffleQuestions, isPublic },
      { new: true }
    );

    if (!updatedQuiz) return res.status(404).json({ message: "Quiz not found" });

    res.json({ message: "Quiz settings updated", quiz: updatedQuiz });
  } catch (err) {
    console.error("Error updating quiz settings:", err);
    res.status(500).json({ message: "Failed to update quiz settings", error: err.message });
  }
};

