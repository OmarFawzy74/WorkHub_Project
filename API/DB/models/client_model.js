
import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema({
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
        required: true,
    },
    clientImage_url: {
        type: String,
       
    },
    clientDesc: {
        type: String,
        
    },
    clientCountry: {
        type: String,
        
    },
    lastLogin: {
        type: Date,
        required: false
    },
    activityStatus: {
        type: String,
        default: 'offline',
        required: false
    },
    role: {
        type: String,
        default: 'client'
    },
    token: {
        type: String,
        required: false
    }
},{
    timestamps: true
});

export default mongoose.model("client", clientSchema);