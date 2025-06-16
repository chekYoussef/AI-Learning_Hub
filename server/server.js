const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;

// ✅ CORS middleware FIRST and FULLY configured
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle JSON
app.use(express.json());

// ✅ Log all requests
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});
app.get("/", (req, res) => {
  res.send("Server root is working ✅");
});
// ✅ ROUTES
app.get("/api", (req, res) => {
  res.send("API is working 🚀");
});

// ✅ Handle preflight manually (optional but good for debugging)
app.options("*", cors());

// ✅ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({ message: err.message });
});

// ✅ Mongo connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
