
import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema({
    freelancer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    client: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "client"
    },
    readByFreelancer: {
        type: Boolean,
    },
    readByClient: {
        type: Boolean,
    },
    lastMessage: {
        type: String,
    }
},{
    timestamps: true
});

export default mongoose.model("conversation", conversationSchema);