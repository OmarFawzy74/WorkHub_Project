
import mongoose from "mongoose";
const { Schema } = mongoose;

const freelancerSchema = new Schema ({
    freelancerId: {
        type: Number,
        required: true,
        unique: true
    },
    freelancerName: {
        type: String,
        required: true
    },
    freelancerEmail: {
        type: String,
        required: true,
        unique: true
    },
    freelancerPassword: {
        type: String,
        required: true
    },
    freelancerImage_url: {
        type: String,
        required: false
    },
    freelancerPhoneNumber: {
        type: Number,
        required: true
    },
    freelancerCountry: {
        type: String,
        required: true,
    },
    freelancerDesc: {
        type: String,
        required: true,
    },
    freelancerLastLogin: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("freelancer", freelancerSchema);