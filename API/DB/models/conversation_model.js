
import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema({
    freelancerId: {
        type: Number,
        required: true
    },
    clientId: {
        type: Number,
        required: true
    },
    readByFreelancer: {
        type: Boolean,
        required: true
    },
    readByClient: {
        type: Boolean,
        required: true
    },
    lastMessage: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

export default mongoose.model("conversation", conversationSchema);