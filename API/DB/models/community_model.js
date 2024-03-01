
import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema ({
    communityName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "category"
    },
    postsIds: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: "post"
    },
    memberId: {
        type: mongoose.Types.ObjectId,
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