import express from "express";
import multer from "multer";
import {
  generateQuiz,
  deleteQuiz,
  getAllQuizzes,
  updateQuizSettings
} from "../controllers/quizController.js";
import { assignQuiz } from "../controllers/assignmentController.js";


const router = express.Router();
const upload = multer();

router.post("/generateQuiz", upload.single("pdfFile"), generateQuiz);
router.post("/assignQuiz", assignQuiz);
router.get("/quizzes", getAllQuizzes);
router.delete("/deleteQuiz/:id", deleteQuiz);
router.put("/quiz/:id/settings", updateQuizSettings);

export default router;
