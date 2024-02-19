
const mongoose = require("mongoose");
const { Schema } = mongoose;

const requestSchema = new Schema({
    freelancerId: {
        type: Number,
        required: true,
    },
    clientId: {
        type: Number,
        required: true,
    },
    requestStatus: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});

export default mongoose.model("request", requestSchema);