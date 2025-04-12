const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Course = require("./models/Course");
const Assignment = require("./models/Assignment");

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/college_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error:", err));

// POST /users - Create a new user
app.post("/users", async (req, res) => {
  try {
    const user = new User({
      _id: req.body._id || new mongoose.Types.ObjectId(), // Automatically generates a new ObjectId if not provided
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,
      role: req.body.role,
      enrolledCourses: req.body.enrolledCourses || [],
      learningTracks: req.body.learningTracks || [],
      streaks: {
        dailyCodingStreak: req.body.streaks?.dailyCodingStreak || 0,
        lastActive: new Date(req.body.streaks?.lastActive || Date.now()),
      },
    });

    await user.save();
    res.status(201).json({ message: "✅ User created", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Failed to create user" });
  }
});

// POST /courses - Create a new course
app.post("/courses", async (req, res) => {
  try {
    const course = new Course({
      title: req.body.title,
      code: req.body.code,
      description: req.body.description,
      facultyId: req.body.facultyId,
      materials: req.body.materials || [],
      assignments: req.body.assignments || [],
      enrolledStudents: req.body.enrolledStudents || [],
    });

    await course.save();
    res.status(201).json({ message: "✅ Course created", course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Failed to create course" });
  }
});

// POST /assignments - Create a new assignment
app.post("/assignments", async (req, res) => {
  try {
    const courseId = mongoose.Types.ObjectId(req.body.courseId); // Convert courseId to ObjectId

    const assignment = new Assignment({
      courseId: courseId,
      title: req.body.title,
      description: req.body.description,
      deadline: new Date(req.body.deadline),
      questions: req.body.questions || [],
      submissions: [], // Initially empty array for submissions
    });

    await assignment.save();
    res.status(201).json({ message: "✅ Assignment created", assignment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Failed to create assignment" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
