import express from "express";
import {Projects} from "../models/Projects.mjs"

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

export default router;