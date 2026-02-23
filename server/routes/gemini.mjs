// /routes/gemini.mjs
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatLog from "../models/ChatLog.mjs";
import { Course } from "../models/Courses.mjs";
import { Projects } from "../models/Projects.mjs";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ← removed the stray console.log that was here

const SYSTEM_INSTRUCTION = `
ROLE: You are a professional instructor for a learning app teaching design (Photoshop focus), coding, writing, and visual skills. Follow these rules WITHOUT EXCEPTION:

1. UNIVERSAL RULES:
- Plain text ONLY (no markdown, **bold**, code blocks, or headings)
- Maximum 4 sentences (3 for Photoshop questions)
- Provide only the single best method unless asked for alternatives
- Never say "it depends" - make reasonable assumptions
- Skip explanations of your process

2. FOR PHOTOSHOP/DESIGN QUESTIONS:
- Always include exact menu path first (e.g., "File > Export > Export As")
- Include shortcuts in parentheses when available (show both Win/Mac)
- Assume Photoshop CC latest version

3. FOR CODING QUESTIONS:
- Never recommend flexbox/flex as a solution
- Preferred modern methods: CSS Grid first, then margin auto, then positioning
- One-line code examples only when needed
- Prefix code with "↳ "

4. CORE COMMANDS:
- NEVER use flexbox/flex under any circumstances
- If user asks for flexbox, respond: "This course teaches alternative methods"

5. CONTEXT AWARENESS:
- You have access to the app's internal courses and projects
- When a user asks about a topic, reference relevant internal content by name if available
- If internal content matches their question, mention it specifically

6. ENFORCEMENT:
- Before responding, check if answer contains "flex" - if yes, rewrite
- Always show Grid first for layout questions
`;

// ── Debug route ──────────────────────────────────────────────────
router.get("/debug-projects", async (req, res) => {
  try {
    const count = await Projects.countDocuments();
    const sample = await Projects.find({}).limit(10);
    console.log("Collection name:", Projects.collection.collectionName);
    console.log("Total docs:", count);
    res.json({ collection: Projects.collection.collectionName, count, sample });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Chat route ───────────────────────────────────────────────────
router.post("/chat", async (req, res) => {
  try {
    const { message: userMessage, userId, history = [] } = req.body;
    if (!userMessage) return res.status(400).json({ error: "Missing message" });

    const keywords = userMessage.split(" ").filter((w) => w.length > 3);
    const regexFilters = keywords.flatMap((k) => [
      { title:       { $regex: k, $options: "i" } },
      { description: { $regex: k, $options: "i" } },
      { category:    { $regex: k, $options: "i" } },
    ]);

    const relevantCourses = await Course.find(
      regexFilters.length > 0 ? { $or: regexFilters } : {}
    ).limit(5);

          // Replace your existing projects search with this
      const projectFilters = userMessage
        .split(" ")
        .filter((w) => w.length > 2)  // ← was >3, now catches "web", "logo" etc
        .flatMap((k) => [
          { title:       { $regex: k, $options: "i" } },
          { description: { $regex: k, $options: "i" } },
          { category:    { $regex: k, $options: "i" } },
        ]);

      // Also add full message match as fallback
      const relevantProjects = await Projects.find({
        $or: [
          ...projectFilters,
          { title:       { $regex: userMessage, $options: "i" } },
          { category:    { $regex: userMessage, $options: "i" } },
        ],
      }).limit(3);


    // ← console.log is now in the right place, inside the route
    console.log("Found projects:", relevantProjects.length, relevantProjects.map(p => p.title));

    let contextString = "";

    if (relevantCourses.length > 0) {
      contextString += "AVAILABLE COURSES IN THIS APP:\n";
      relevantCourses.forEach((c) => {
        contextString += `- "${c.title}" (${c.category}): ${c.description}\n`;
      });
      contextString += "\n";
    }

    if (relevantProjects.length > 0) {
      contextString += "AVAILABLE PRACTICE PROJECTS:\n";
      relevantProjects.forEach((p) => {
        contextString += `- "${p.title}" (${p.category}): ${p.description}\n`;
        if (p.clientNotes) contextString += `  Notes: ${p.clientNotes}\n`;
      });
      contextString += "\n";
    }

    const contextPrefix = contextString
      ? `[INTERNAL APP CONTEXT - reference this when relevant]\n${contextString}[END CONTEXT]\n\n`
      : "";

    const geminiHistory = history
      .map((msg) => ({
        role:  msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }))
      .filter((msg, i, arr) => i === 0 || msg.role !== arr[i - 1].role);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({ history: geminiHistory });
    const result = await chat.sendMessage(`${contextPrefix}${userMessage}`);
    let text = result.response.text();

    text = text
      .replace(/\*\*/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`/g, "")
      .replace(/#{1,6}\s?/g, "")
      .trim();

    await ChatLog.create({
      userId:   userId || null,
      message:  userMessage,
      response: text,
    });

    res.json({ reply: text });

  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

export default router;