
const mongoose = require("mongoose");
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
        type: Number,
        required: true,
        unique: true
    },
    categoryId: {
        type: Number,
        required: true,
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