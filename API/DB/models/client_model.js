
import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientEmail: {
        type: String,
        required: true,
        unique: true
    },
    clientPassword: {
        type: String,
        required: true,
    },
    clientImage_url: {
        type: String,
        required: false,
    },
    clientDesc: {
        type: String,
        required: true
    },
    clientCountry: {
        type: String,
        required: true,
    },
    clientLastLogin: {
        type: Date,
        required: false,
    },
},{
    timestamps: true
});

export default mongoose.model("client", clientSchema);