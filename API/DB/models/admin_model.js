
import mongoose from "mongoose";
const { Schema } = mongoose;

const adminSchema = new Schema ({
    username: {
        type: String,
        required: true
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
    adminActivityStatus: {
        type: String,
    },
    adminLastLogin: {
        type: Date,
    },
    role: {
        type: String,
        default: 'admin'
    }
},{
    timestamps: true
});

export default mongoose.model("admin", adminSchema);