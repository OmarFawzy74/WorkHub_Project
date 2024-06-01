
import client_model from "../../../DB/models/client_model.js";
import community from "../../../DB/models/community_model.js";
import freelancer_model from "../../../DB/models/freelancer_model.js";

// Get All Communities
export const getAllCommunities = async (req, res) => {
    try {
        let allCommunities = await community.find().populate("freelancerMembers").populate("clientMembers").populate("communityPosts");
        if(allCommunities.length !== 0) {

            const modifiedCommunities = allCommunities.map((community) => {
                let modifiedCommunity = { ...community._doc }; // Create a copy of the service object
                // modifiedCommunity.clientMembers = [{ ...modifiedCommunity.clientMembers[0] }];
                // modifiedCommunity.freelancerMembers = { ...modifiedCommunity.freelancerMembers._doc };
                // modifiedService.freelancerId.image_url = "http://" + req.hostname + ":3000/" + modifiedService.freelancerId.image_url;
                // modifiedService.serviceCover_url = "http://" + req.hostname + ":3000/" + modifiedService.serviceCover_url;

                // modifiedCommunity.freelancerMembers = modifiedCommunity.freelancerMembers.map((freelancer) => {
                //     freelancer.image_url = "http://" + req.hostname + ":3000/" + freelancer.image_url;
                // });
                // console.log(modifiedCommunity);

                console.log(modifiedCommunity.clientMembers);
                // if (modifiedCommunity.clientMembers[0]) {
                //     modifiedCommunity.clientMembers = modifiedCommunity.clientMembers.map((client) => {
                //         client.image_url = "http://" + req.hostname + ":3000/" + client.image_url;
                //     });
                // }

                return modifiedCommunity;
            });

            allCommunities = modifiedCommunities;

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
        const userId = req.params.id;
        const role = req.params.role;
    
        const allCommunities = await community.find();

        const modifiedCommunities = allCommunities.map((community) => {
            const modifiedCommunity = { ...community._doc }; // Create a copy of the service object
            // modifiedCourse.courseCoverImage_url = "http://" + req.hostname + ":3000/" + modifiedCourse.courseCoverImage_url;
            // modifiedCourse.proffImage_url = "http://" + req.hostname + ":3000/" + modifiedCourse.proffImage_url;
            return modifiedCommunity;
        });

        // console.log(allCommunities);
        // console.log(modifiedCommunities);
    
        let communitiesData = [];
        // const coursesIds = [];

        if (role == "freelancer") {
            modifiedCommunities.map((community) => {
                community.freelancerMembers.filter((id) => {
                    if (id == userId) {
                        communitiesData.push(community);
                    }
                })
            })
        }

        if(role == "client") {
            modifiedCommunities.map((community) => {
                community.clientMembers.filter((id) => {
                    if (id == userId) {
                        communitiesData.push(community);
                    }
                })
            })
        }

        // console.log(communitiesData);
    
        if(role !== "client" && role !== "freelancer") {
            return res.status(404).json({ msg: "Invalid role!" });
        }


        if (communitiesData.length == 0) {
            return res.status(404).json({ msg: "No Communities Found!" });
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

// Unjoin Community
export const unjoinCommunity = async (req, res) => {
    try {
        const communityId = req.params.communityId;
        const userId = req.params.userId;
        const role = req.params.role;
        const communityData = await community.findById(communityId);

        if(!communityData) {
            return res.status(404).json({ msg: "Community Not Found!" });
        }

        if(role == "freelancer") {
            if(userId == undefined) {
                return res.status(404).json({ msg: "Freelancer id is required!" });
            }

            const freelancerData = await freelancer_model.findById(userId);

            if(!freelancerData) {
                return res.status(404).json({ msg: "Freelancer not found!" });
            }
    
            const joinedMembers = communityData.freelancerMembers;

            let actualData = [];

            joinedMembers.filter((id) => {
                if (id.valueOf() == userId) {
                    actualData.push(id.valueOf());
                }
            })

            if(actualData.length == 0) {
                return res.status(400).json({ msg: "You Are Not Joined In This Community!" });
            }
    
            let data = [];

            joinedMembers.filter((id) => {
                if (id.valueOf() !== userId) {
                    data.push(id.valueOf());
                }
            });
    
            const filter = { _id: communityId };
    
            const update = { $set: { freelancerMembers: data} }
    
            await community.updateOne(filter, update);
        }

        if(role == "client") {
            if(userId == undefined) {
                return res.status(404).json({ msg: "Client id is required!" });
            }

            const clientData = await client_model.findById(userId);

            if(!clientData) {
                return res.status(404).json({ msg: "Client not found!" });
            }
    
            const joinedMembers = communityData.clientMembers;
    
            let actualData = [];

            joinedMembers.filter((id) => {
                if (id.valueOf() == userId) {
                    actualData.push(userId);
                }
            })

            if(actualData.length == 0) {
                return res.status(400).json({ msg: "You are not enrolled in this course!" });
            }
    
            let data = [];

            joinedMembers.filter((id) => {
                if (id.valueOf() != userId) {
                    data.push(userId);
                }
            })
    
            const filter = { _id: communityId };
    
            const update = { $set: { clientMembers: data} }
    
            await community.updateOne(filter, update);
        }

        if(role !== "client" && role !== "freelancer") {
            return res.status(404).json({ msg: "Invalid role!" });
        }

        res.status(200).json({ msg: "Unjoined Community Successfuly." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Join Community
export const joinCommunity = async (req, res) => {
    try {
        const communityId = req.params.communityId;
        const userId = req.params.userId;
        const role = req.params.role;
        const communityToUpdate = await community.findById(communityId);

        if (!communityToUpdate) {
            return res.status(404).json({ msg:"Community Not Found" });
        }

        let members;

        if(role == "freelancer") {
            members = communityToUpdate.freelancerMembers;
        }
        
        if (role == "client") {
            members = communityToUpdate.clientMembers;
        }

        if(role !== "client" && role !== "freelancer") {
            return res.status(400).json({ msg: "Invalid role!" });
        }

        members.map((memberId) => {
            if (memberId == userId) {
                return res.status(400).json({ msg: "You Have Already Joined The Community!" });     
            }
        })

        members.push(userId);

        const filter = { _id: communityId };
        let update;

        if (role == "freelancer") {
            update = { $set: { freelancerMembers: members } };
        }

        if (role == "client") {
            update = { $set: { clientMembers: members } };
        }

        await community.updateOne(filter, update);
        res.status(200).json({ msg:"Joined Community Successfuly." });
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

export const uploadCoverImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(404).send({ success: false, message: "Cover image is required" });
        }

        const id = req.params.id;

        if (id == undefined) {
            return res.status(404).send({ success: false, message: "id is required" });
        }

        const cover_url = req.file.filename;

        const filter = { _id: id };
        const update = { $set: { coverImage_url: cover_url } };

        await freelancer_model.updateOne(filter, update);


        res.status(200).json({ msg: "Cover image uploaded successfuly" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
};