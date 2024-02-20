
import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema ({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    adminActivityStatus: {
        type: String,
        required: true
    },
    adminLastLogin: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

export default mongoose.model("admin", adminSchema);