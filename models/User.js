const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  dailyCodingStreak: Number,
  lastActive: Date
});

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  passwordHash: String,
  role: String,
  enrolledCourses: [String],
  learningTracks: [String],
  streaks: streakSchema
});

module.exports = mongoose.model("User", userSchema);
