import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    link: String,
    image: String, 
});
courseSchema.index({ title: "text", description: "text" });
export const Course = mongoose.model("Course", courseSchema)