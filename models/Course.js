const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  code: String,
  description: String,
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" // assuming faculty is a user
  },
  materials: [String],
  assignments: [String],
  enrolledStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("Course", courseSchema);
