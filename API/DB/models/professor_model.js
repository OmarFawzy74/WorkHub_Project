
import mongoose from "mongoose";
const { Schema } = mongoose;

const proffSchema = new Schema({
    proffName: {
        type: String,
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
    }
},{
    timestamps: true
});

export default mongoose.model("proffesor", proffSchema);