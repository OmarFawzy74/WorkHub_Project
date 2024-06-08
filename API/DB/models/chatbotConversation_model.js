import mongoose from "mongoose";
const { Schema } = mongoose;

const chatbotConversation = new Schema({
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    senderType: {
        type: String,
        required: true,
    },
    senderMessage: {
        type: String,
        required: false,
    },
    chatbotResponse: {
        type: String,
        required: false,
    }
},{
    timestamps: true
});

export default mongoose.model("chatbotConversation", chatbotConversation);