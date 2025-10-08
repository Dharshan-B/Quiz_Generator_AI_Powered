import express from "express";
import { getStudentResults, saveResult } from "../controllers/resultController.js";

const router = express.Router();

// GET results for a student
// GET /api/student/results?studentId=...
router.get("/results", getStudentResults);

// POST result after finishing quiz
router.post("/results", saveResult);

export default router;
