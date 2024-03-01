
import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema({
    freelancerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "client"
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