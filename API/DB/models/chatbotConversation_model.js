import mongoose from "mongoose";
const { Schema } = mongoose;

const chatbotConversation = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    senderMessage: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    chatbotResponse: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("chatbotConversation", chatbotConversation);