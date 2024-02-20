
import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
    communityId: {
        type: Number,
        required: true
    },
    posterId: {
        type: Number,
        required: false,
    },
    posterType: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    likes: {
        type: Number,
        required: false
    },
    Comments: {
        type: [String],
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("post", postSchema);