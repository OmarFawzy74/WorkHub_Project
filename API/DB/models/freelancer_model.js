
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
    freelancerImage_url: {
        type: String,
        required: false
    },
    freelancerPhoneNumber: {
        type: Number,
        
    },
    freelancerCountry: {
        type: String,
       
    },
    freelancerDesc: {
        type: String,
       
    },
    freelancerLastLogin: {
        type: String,
       
    },
    role: {
        type: String,
        default: 'freelancer'
    }
},{
    timestamps: true
});

export default mongoose.model("freelancer", freelancerSchema);