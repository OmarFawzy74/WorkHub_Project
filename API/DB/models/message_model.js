
import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversation: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "conversation"
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    senderType: {
        type: String,
        required: true
    },
    messageContent: {
        type: String,
        required: true
    },
    creationDate: {
        type: String,
    }
},{
    timestamps: true
});

export default mongoose.model("message", messageSchema);