
const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientId: {
        type: Number,
        required: true,
        unique: true
    },
    clientName: {
        type: String,
        required: true,
        unique: true
    },
    clientUsername: {
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
        type: String,
        required: true,
    },
},{
    timestamps: true
});

export default mongoose.model("client", clientSchema);