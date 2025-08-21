const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/User"); // ✅ use User.js because that's your file name

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000",  // React frontend URL
  methods: [ "POST"], // allow all common methods
}));
app.use(express.json());

// Routes
app.use("/api", authRoutes); // ✅ frontend can now call /api/register and /api/login

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
