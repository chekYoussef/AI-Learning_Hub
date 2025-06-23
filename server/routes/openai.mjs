// routes/openai.mjs
import { OpenAI } from "openai";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("User message:", userMessage); // Debug

    const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini", // ✅ Use this model
  messages: [{ role: "user", content: userMessage }],
});

    console.log("OpenAI Response:", JSON.stringify(completion, null, 2)); // Debug

    const reply = completion.choices?.[0]?.message?.content;

    res.json({ reply });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "OpenAI failed" });
  }
});

export default router;
