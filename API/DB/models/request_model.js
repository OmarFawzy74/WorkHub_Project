
import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema({
    freelancerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    clientId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "client"
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "service"
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