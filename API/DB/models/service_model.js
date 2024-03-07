
import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceSchema = new Schema({
    serviceTitle: {
        type: String,
        required: true
    },
    serviceDesc: {
        type: String,
        required: true
    },
    servicePrice: {
        type: Number,
        required: true
    },
    serviceCover_url: {
        type: String,
    },
    serviceImages_url: {
        type: [String],
    },
    serviceShortTitle: {
        type: String,
        required: true
    },
    serviceDesc: {
        type: String,
        required: true
    },
    freelancer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    serviceCategory: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "category"
    },
    deliveryTime: {
        type: String,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    orders: {
        type: [mongoose.Types.ObjectId],
        ref: "order"
    },
    sales: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [mongoose.Types.ObjectId],
        ref: "review"
    },
    totalRating: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

export default mongoose.model("service", serviceSchema);