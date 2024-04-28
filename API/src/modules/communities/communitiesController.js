
import community from "../../../DB/models/community_model.js";

// Get All Communities
export const getAllCommunities = async (req, res) => {
    try {
        const allCommunities = await community.find();
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