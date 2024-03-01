
import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "conversation"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    conversationDesc: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("message", messageSchema);