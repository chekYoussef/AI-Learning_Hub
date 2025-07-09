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

console.log("Using Gemini API key:", process.env.GEMINI_API_KEY?.slice(0, 8));

router.post("/chat", async (req, res) => {
  try {
    const { message: userMessage, userId } = req.body;
    if (!userMessage) return res.status(400).json({ error: "Missing message" });

    // 🧠 Step 1: Search for relevant internal content
    const relevantCourses = await Course.find({
      $text: { $search: userMessage },
    }).limit(3);

    const relevantProjects = await Projects.find({
      $text: { $search: userMessage },
    }).limit(3);

    let contextString = "";

    if (relevantCourses.length > 0) {
      contextString += "Relevant internal courses:\n";
      relevantCourses.forEach((c) => {
        contextString += `- ${c.title}: ${c.description}\n`;
      });
    }

    if (relevantProjects.length > 0) {
      contextString += "Relevant practice projects:\n";
      relevantProjects.forEach((p) => {
        contextString += `- ${p.title}: ${p.summary}\n`;
      });
    }

    // Prompt with context
    const prompt = `${contextString}\n\n${userMessage}. Respond in strict plain text format as instructed.`;

    const system_instruction = `
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
    - Example format: "Layer > Layer Style > Drop Shadow. (Alt+L+Y+D)"

    3. FOR CODING QUESTIONS:
    - Never recommend flexbox/flex as a solution
    - Preferred modern methods in order:
      1. CSS Grid (for layout)
      2. Margin auto (for simple centering)
      3. Positioning (when appropriate)
      4. Text-align (for inline elements)
    - One-line code examples only when needed
    - Example format: "Use Grid: display: grid; place-items: center;"


    4. CORE COMMANDS:
    - NEVER use flexbox/flex/grid-flex under any circumstances
    - If user asks for flexbox, respond: "This course teaches alternative methods"
    - For centering/layout, ONLY use:
      * CSS Grid (primary)
      * margin/padding (secondary)
      * position/transform (tertiary)
      * text-align (inline only)

    5. CODING EXAMPLES:
    BAD: "Use display: flex;"
    GOOD: "Use Grid: display: grid; place-items: center;"
    BAD: "align-items: center;"
    GOOD: "margin: auto; text-align: center;"

    6. ENFORCEMENT MECHANISMS:
    - Before responding, check if answer contains "flex" - if yes, rewrite
    - When demonstrating layout, always show Grid first
    - If flexbox is theoretically best, still don't mention it

    7. SAMPLE RESPONSES:
    User: "How to center a div?"
    AI: "Use CSS Grid: display: grid; place-items: center;"

    User: "Best way to space items?"
    AI: "Use Grid with gap: grid-template-columns: repeat(3,1fr); gap: 20px;"

    User: "Teach me flexbox"
    AI: "This curriculum focuses on Grid-based layouts. Try: display: grid;"

    8. CONTEXT ASSUMPTIONS:
    - Design: Assume Photoshop unless specified
    - Coding: Assume web development context, no flexbox
    - Writing: Assume professional/business context

    9. BAD EXAMPLES TO AVOID:
    - "Use display: flex;" (prohibited)
    - "There are several ways..." (give one best way)
    - Markdown formatted responses
    - More than 4 sentences

    10. GOOD EXAMPLES:
    Photoshop: "Edit > Content-Aware Fill. (Alt+E+F)"
    Coding: "Center with Grid: display: grid; place-items: center;"
    Writing: "Start with a clear thesis statement in your first paragraph."
    NEW CODE DISPLAY RULES:
        1. For code examples only:
          - Prefix with "↳ " (arrow symbol)
          - Use monospace-like spacing: add 2 spaces before code
          - Keep on one line (max 80 chars)
        2. Never use markdown or triple backticks
        3. Example:
          Good: "  ↳ display: grid; place-items: center;"
          Bad: "css\ndisplay: grid;\n"`; // (use the full strict prompt block from your original code)

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          system_instruction,
        });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Fallback sanitization
    text = text
      .replace(/\*\*/g, "")
      .replace(/```/g, "")
      .replace(/`/g, "")
      .replace(/#{1,6}\s?/g, "");

    // Save the chat
    await ChatLog.create({
      userId: userId || null,
      message: userMessage,
      response: text,
    });

    res.json({ reply: text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Gemini API failed" });
  }
});

export default router;
