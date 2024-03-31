
import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceSchema = new Schema({
    serviceTitle: {
        type: String,
        unique: true,
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
    freelancerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "freelancer"
    },
    serviceCategoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "category"
    },
    deliveryTime: {
        type: Number,
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
    revisionNumber: {
        type: Number,
        default: 0
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

// Calculate the total rating before saving the document
// serviceSchema.pre('save', async function(next) {
//     try {
//         const reviews = this.reviews || [];
//         const totalReviews = reviews.length;

//         // Calculate the total sum of ratings
//         const totalSum = reviews.reduce((sum, review) => sum + review.rating, 0);

//         // Calculate the average rating
//         const averageRating = totalReviews > 0 ? totalSum / totalReviews : 0;

//         // Update the total rating field
//         this.totalRating = averageRating;

//         next();
//     } catch (error) {
//         next(error);
//     }
// });

export default mongoose.model("service", serviceSchema);