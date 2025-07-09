import mongoose from "mongoose"

const chatLogSchema = new mongoose.Schema({
 userId: { type: String, required: false }, // Optional for guests
  message: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatLog = mongoose.model("ChatLog", chatLogSchema);

export default ChatLog;
