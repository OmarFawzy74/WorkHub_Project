
import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema ({
    communityName: {
        type: String,
        required: true
    },
    categoryId: {
        type: Number,
        required: true,
    },
    postsIds: {
        type: [Number],
        required: true,
    },
    memberId: {
        type: Number,
        required: true,
    },
    memberType: {
        type: String,
        required: true,
    },
    membersCount: {
        type: Number,
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("community", communitySchema);