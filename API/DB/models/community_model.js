
import mongoose from "mongoose";
const { Schema } = mongoose;

const communitySchema = new Schema ({
    communityName: {
        type: String,
        required: true
    },
    communityCategory: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "category"
    },
    communityPosts: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: "post"
    },
    clientMembers: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: "client"
    },
    freelancerMembers: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: "freelancer"
    }
},{
    timestamps: true
});

export default mongoose.model("community", communitySchema);