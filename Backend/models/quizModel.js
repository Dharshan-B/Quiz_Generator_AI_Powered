import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: String, required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        answer: { type: String, required: true },
      },
    ],

    // Existing fields
    difficulty: { type: String, default: "medium" },
    questionType: { type: String, default: "mix" },
    createdAt: { type: Date, default: Date.now },

    // 🧩 New configurable fields
    timer: { type: Number, default: 10 }, // Duration in minutes
    startTime: { type: String, default: "" }, // ISO string format
    endTime: { type: String, default: "" },
    allowRetry: { type: Boolean, default: false },
    shuffleQuestions: { type: Boolean, default: true },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
