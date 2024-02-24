
import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema({
    freelancerId: {
        type: String,
        required: true,
    },
    clientId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    requestStatus: {
        type: String,
        required: false,
        default: "pending"
    },
},{
    timestamps: true
});

export default mongoose.model("request", requestSchema);