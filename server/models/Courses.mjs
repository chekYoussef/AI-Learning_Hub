import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    categorie:String,
    title:String,
    description:String,
    link:string,
});
export const Course = mongoose.model("Course", courseSchema)