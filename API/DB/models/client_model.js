
import mongoose from "mongoose";
const { Schema } = mongoose;

const clientSchema = new Schema({
    username: {
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
    clientLastLogin: {
        type: String,
      
    },
    role: {
        type: String,
        default: 'client'
    }
},{
    timestamps: true
});

export default mongoose.model("client", clientSchema);