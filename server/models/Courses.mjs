import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    link: String,
    image: String, 
});
export const Course = mongoose.model("Course", courseSchema)