
import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema ({
    categoryId: {
        type: Number,
        required: true,
    },
    proffId: {
        type: Number,
        required: true,
    },
    courseTitle: {
        type: String,
        required: true
    },
    courseDesc: {
        type: String,
        required: true,
    },
    courseDuration: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("course", courseSchema);