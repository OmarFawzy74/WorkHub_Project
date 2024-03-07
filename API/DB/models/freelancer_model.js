
import mongoose from "mongoose";
const { Schema } = mongoose;

const freelancerSchema = new Schema ({
    name: {
        type: String,
        required: true,
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
    phoneNumber: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    desc: {
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