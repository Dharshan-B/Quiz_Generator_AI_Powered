import express from "express";
import { getPublicQuizzes, getQuizById, submitQuiz } from "../controllers/studentController.js";

const router = express.Router();

// Fetch all public quizzes
router.get("/public-quizzes", getPublicQuizzes);

// Fetch quiz by ID
router.get("/quiz/:id", getQuizById);

// Submit quiz
router.post("/quiz/:id/submit", submitQuiz);

export default router;
