
import mongoose from "mongoose";
const { Schema } = mongoose;

const courseSchema = new Schema ({
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "category"
    },
    proffId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "proffesor"
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
        type: String,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("course", courseSchema);