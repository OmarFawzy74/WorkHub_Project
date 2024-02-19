
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    serviceId: {
        type: Number,
        required: true,
    },
    clientId: {
        type: Number,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        required: true,
        enum: [1,2,3,4,5]
    },
    reviewDesc: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("review", reviewSchema);