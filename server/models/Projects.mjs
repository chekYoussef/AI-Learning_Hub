import mongoose, { Schema } from "mongoose";

const projectsSchema = new mongoose.Schema({
        category: String,
        title: String,
        status:String,
        description: String,
        clientNotes: String,
        ressources: String, 
    });
    projectsSchema.index({ title: "text", description: "text" });
    export const Projects = mongoose.model("Projects", projectsSchema)