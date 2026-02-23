import Course from "../models/Course.js"; 
import Project from "../models/Project.js";

// Try searching for relevant internal content first
const relevantCourses = await Course.find({
  $or: [
    { title: { $regex: userMessage, $options: "i" } },
    { description: { $regex: userMessage, $options: "i" } },
    { category: { $regex: userMessage, $options: "i" } },
  ],
}).limit(5);

const relevantProjects = await Project.find({
  $text: { $search: userMessage }
}).limit(3);

let contextString = "";

if (relevantCourses.length > 0) {
  contextString += "Relevant internal courses:\n";
  relevantCourses.forEach(c => {
    contextString += `- ${c.title}: ${c.description}\n`;
  });
}

if (relevantProjects.length > 0) {
  contextString += "Relevant practice projects:\n";
  relevantProjects.forEach(p => {
    contextString += `- ${p.title}: ${p.summary}\n`;
  });
}
