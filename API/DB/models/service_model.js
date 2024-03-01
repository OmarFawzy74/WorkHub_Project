
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
    totalRating: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        required: true
    },
    servicePrice: {
        type: Number,
        required: true
    },
    serviceCover_url: {
        type: String,
        required: true
    },
    serviceImages_url: {
        type: [String],
        required: false
    },
    serviceShortTitle: {
        type: String,
        required: true
    },
    serviceShortDesc: {
        type: String,
        required: true
    },
    freelancerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    categoryId: {
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
    sales: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

export default mongoose.model("service", serviceSchema);