import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("Using Gemini API key:", process.env.GEMINI_API_KEY?.slice(0, 8));
router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", system_instruction:"You are a helpful and expert coding instructor/creative instructor in a learning app, helping users learn skills in design, writing, or visual art. Explain programming concepts clearly and step-by-step. Adjust your explanations to the user's level, from beginner to advanced. Use simple examples when needed. Respond concisely, but clearly."});
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

export default router;
