
import mongoose from "mongoose";
const { Schema } = mongoose;

const requestSchema = new Schema({
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
        default: "Pending"
    },
},{
    timestamps: true
});

export default mongoose.model("request", requestSchema);