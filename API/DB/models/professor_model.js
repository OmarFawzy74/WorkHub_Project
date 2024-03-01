
import mongoose from "mongoose";
const { Schema } = mongoose;

const proffSchema = new Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "course"
    },
    proffName: {
        type: Number,
        required: false,
    },
    proffTitle: {
        type: String,
        required: true
    },
    proffImage_url: {
        type: String,
        required: true
    },
    ProffDesc: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

export default mongoose.model("proffesor", proffSchema);