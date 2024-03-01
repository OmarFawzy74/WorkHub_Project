
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderImage_url: {
        type: String,
        required: false,
    },
    requestId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "request"
    },
    freelancerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    clientId: {
        type:  mongoose.Types.ObjectId,
        required: true,
        ref: "client"
    },
    serviceId: {
        type:  mongoose.Types.ObjectId,
        required: true,
        ref: "service"
    },
    orderTitle: {
        type: String,
        required: true,
    },
    orderPrice: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("order", orderSchema);