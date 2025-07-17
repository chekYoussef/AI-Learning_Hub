import express from "express";
import { Roadmap } from "../models/Roadmap.mjs";

const router = express.Router();

router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const roadmap = await Roadmap.findOne({ category: category.toLowerCase() });
        router.get("/", async (req, res) => {
      const all = await Roadmap.find();
      res.json(all);
    });


    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found" });
    }

    res.json(roadmap);
  } 
  catch (err) {
    console.error("Error fetching roadmap:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
