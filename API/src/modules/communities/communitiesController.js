
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

// Get Joined Communities
export const getJoinedCommunities = async (req, res) => {
    try {
        const userId = req.params.userId;
        const role = req.params.role;
    
        const allCommunities = await course.find();

        const modifiedCommunities = allCommunities.map((community) => {
            const modifiedCommunity = { ...community._doc }; // Create a copy of the service object
            // modifiedCourse.courseCoverImage_url = "http://" + req.hostname + ":3000/" + modifiedCourse.courseCoverImage_url;
            // modifiedCourse.proffImage_url = "http://" + req.hostname + ":3000/" + modifiedCourse.proffImage_url;
            return modifiedCommunity;
        });
    
        const communitiesData = [];
        // const coursesIds = [];

        if (role == "freelancer") {
            modifiedCommunities.map((community) => {
                community.freelancerMembers.filter((id) => {
                    if (id == userId) {
                        coursesData.push(community);
                    }
                })
            })
        }

        if(role == "client") [
            modifiedCommunities.map((community) => {
                community.clientMembers.filter((id) => {
                    if (id == userId) {
                        coursesData.push(community);
                    }
                })
            })
        ]
    
        if(role !== "client" && role !== "freelancer") {
            return res.status(404).json({ msg: "Invalid role!" });
        }


        if (communitiesData.length == 0) {
            return res.status(404).json({ msg: "No Courses Found!" });
        }
    
        res.status(200).json({ communitiesData });
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

export const joinCommunity = async (req, res) => {
    try {
        const communityId = req.params.id;
        const role = req.params.role;
        const communityToUpdate = await community.findById(communityId);

        let members;

        if(role == "freelancer") {
            members = communityToUpdate.freelancerMembers;
        }
        
        if (role == "client") {
            members = communityToUpdate.clientMembers;
        }

        if(role !== "client" && role !== "freelancer") {
            return res.status(404).json({ msg: "Invalid role!" });
        }

        if(communityToUpdate) {
            const filter = { _id: communityId };
            let update;
            if (role == "freelancer") {
                update = { $set: {  } };
            }


            await community.updateOne(filter, update);
            return res.status(200).json({ msg:"Community has been updated successfuly." });
        }

        res.status(400).json({ msg:"Invalid Community ID" });
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