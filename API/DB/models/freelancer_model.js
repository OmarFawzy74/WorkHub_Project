
import mongoose from "mongoose";
const { Schema } = mongoose;

const freelancerSchema = new Schema ({
   username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false
    },
    freelancerPhoneNumber: {
        type: Number,
        required: false
    },
    freelancerCountry: {
        type: String,
        required: false
    },
    freelancerDesc: {
        type: String,
        required: false
    },
    activityStatus: {
        type: String,
        default: 'offline',
        required: false
    },
    lastLogin: {
        type: Date,
        required: false
    },
    role: {
        type: String,
        default: 'freelancer'
    },
    token: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

export default mongoose.model("freelancer", freelancerSchema);