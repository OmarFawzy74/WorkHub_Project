
const mongoose = require("mongoose");
const { Schema } = mongoose;

const proffSchema = new Schema({
    courseId: {
        type: Number,
        required: true
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