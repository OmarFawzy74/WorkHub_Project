
import community from "../../../DB/models/community_model.js";

// Unfinished Tasks

// 1. Check Authentication
// 2. Check Authorization

// Get All Community
export const getAllCommunities = async (req, res) => {
    try {
        const allCommunities = await community.find().populate('communityCategory');
        if(allCommunities.length !== 0) {
            res.status(200).json({ allCommunities });;
        }
        else {
            res.status(400).json({ msg:"No communities found!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Add Community
export const addCommunity = async (req, res) => {
    try {
        const communityName = {communityName: req.body.communityName};
        const data = await community.find(communityName);

        if(data.length === 0){
            const newCommunity = new community({
                ...req.body,
            });
    
            await newCommunity.save();
            return res.status(200).json({ msg:"Community has been created successfuly." });
        }
        res.status(400).json({ msg:"Community is already exists!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Update Community
export const updateCommunity = async (req, res) => {
    try {
        const communityId = req.params.id;
        const communityToUpdate = await community.findById(communityId);

        if(communityToUpdate) {
            const filter = { _id: communityId };
            const update = { $set: { communityName: req.body.communityName, communityCategory: req.body.communityCategory, communityPosts: req.body.communityPosts, clientMemberIds: req.body.clientMemberIds, freelancerMemberIds: req.body.freelancerMemberIds, membersCount: req.body.membersCount } };
            await community.updateOne(filter, update);
            return res.status(200).json({ msg:"Community has been updated successfuly." });
        }

        res.status(400).json({ msg:"There is no community with such id to update." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Delete Community
export const deleteCommunity = async (req, res) => {
    try {
        const communityId = req.params.id
        const communityToDelete = await community.findById(communityId);

        if(communityToDelete){
            const filter = { _id: communityId };

            await community.deleteOne(filter);
            res.status(200).json({ msg:"Community has been deleted successfuly." });
        }
        else {
            res.status(400).json({ msg:"Community deletion failed." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

const allCommunity = async (req, res) => {
    try {
        const community = await CommunityModel.find({});

        if (!community || community.length === 0) {
            return res.status(404).json({ msg:"No communitys found" });
        }

        return res.status(200).json({ msg:"Communitys found", community });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg:"Internal server error" });
    }
};

export default allCommunity