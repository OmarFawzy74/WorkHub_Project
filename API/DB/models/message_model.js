
const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    conversationId: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
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