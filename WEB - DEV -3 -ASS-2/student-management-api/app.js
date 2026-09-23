const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json()); // parses incoming JSON request bodies
app.use(logger); // custom logger middleware (logs every request)

// Routes
app.use("/students", studentRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Student Management REST API is running ✅");
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler (catches any unexpected errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});