
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderImage_url: {
        type: String,
        required: false,
    },
    freelancerId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
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