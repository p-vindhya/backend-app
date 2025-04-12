const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: String,
  maxMarks: Number
});

const assignmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  title: String,
  description: String,
  deadline: Date,
  questions: [questionSchema],
  submissions: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      answers: [String],
      submittedAt: Date,
      totalMarks: Number
    }
  ]
});

module.exports = mongoose.model("Assignment", assignmentSchema);
