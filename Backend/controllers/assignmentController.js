import Assignment from "../models/Assignment.js";

export const assignQuiz = async (req, res) => {
  const { quizId, assignedTo } = req.body;
  try {
    const assignment = new Assignment({ quiz: quizId, assignedTo });
    await assignment.save();
    res.json({ message: "Quiz assigned successfully", assignment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAssignedQuizzes = async (req, res) => {
  const { studentId } = req.params;
  const assigned = await Assignment.find({ assignedTo: studentId }).populate("quiz");
  res.json(assigned);
};
