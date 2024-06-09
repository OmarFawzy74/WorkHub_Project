
import mongoose from "mongoose";
const { Schema } = mongoose;

const blockedUsersSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("blockedUsers", blockedUsersSchema);