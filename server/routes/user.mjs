import express from "express";
import User from "../models/User.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { sub, name, email, picture } = req.body;

    let user = await User.findOne({ sub });

    if (!user) {
      user = new User({ sub, name, email, picture });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("User save error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
