import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./auth/passport.mjs";
import geminiRoute from "./routes/gemini.mjs";
import coursesRouter from "./routes/courses.mjs";
import projectsRouter from "./routes/projects.mjs";
import roadmapRoutes from "./routes/roadmaps.mjs";
import userRoutes from "./routes/user.mjs";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Logging
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.path}`);
  next();
});

app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users", userRoutes);
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard", // Redirect after success
    failureRedirect: "http://localhost:5173/login",
  })
);

// API routes
app.use("/api/gemini", geminiRoute);
app.use("/api/courses", coursesRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/roadmaps", roadmapRoutes);

app.get("/", (req, res) => {
  res.send("Server root is working ✅");
});
app.get("/api/user", (req, res) => {
  res.json(req.user || null);
});
app.get("/api", (req, res) => {
  res.send("API is working 🚀");
});
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
