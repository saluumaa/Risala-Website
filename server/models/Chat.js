import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    }, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;