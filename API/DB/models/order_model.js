
const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    serviceId: {
        type: Number,
        required: true
    },
    orderImage_url: {
        type: String,
        required: false,
    },
    freelancerId: {
        type: Number,
        required: true
    },
    clientId: {
        type: Number,
        required: true
    },
    orderTitle: {
        type: String,
    },
    orderPrice: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("order", orderSchema);