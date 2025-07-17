import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  bannerImage: String,
  children: [] // temporarily empty
}, { _id: false });

// Add recursion **after** initial declaration:
NodeSchema.add({
  children: [NodeSchema]
});

const RoadmapSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  nodeStructure: { type: NodeSchema, required: true }
});

export const Roadmap = mongoose.model("Roadmap", RoadmapSchema);
