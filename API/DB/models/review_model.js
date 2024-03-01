
import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
    serviceId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "service"
    },
    clientId: {
        type: Number,
        required: true,
        ref: "client"
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