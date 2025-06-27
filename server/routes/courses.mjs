import express from "express";
import {Course} from "../models/Courses.mjs"

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

export default router;