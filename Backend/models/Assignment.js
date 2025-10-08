import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dueDate: { type: Date },
  status: { type: String, default: "pending" },
});

export default mongoose.model("Assignment", assignmentSchema);
