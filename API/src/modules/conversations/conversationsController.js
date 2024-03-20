
import conversation from "../../../DB/models/conversation_model.js";

// Get All Conversations
export const getAllConversations = async (req, res) => {
    try {
        const allConversations = await conversation.find().populate('freelancer', {_id: 1, name: 1, email: 1}).populate('client', {_id: 1, name: 1, email: 1});
        if(allConversations.length !== 0) {
            res.status(200).json({ allConversations });
        }
        else {
            res.status(400).json({ msg:"No conversations found!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Get A Conversation By ID
export const getConversationById = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const conversationData = await conversation.findById(conversationId).populate('freelancer', {_id: 1, name: 1, email: 1}).populate('client', {_id: 1, name: 1, email: 1});
        if(conversationData.length !== 0) {
            res.status(200).json({ conversationData });
        }
        else {
            res.status(400).json({ msg:"conversation not found!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Add Conversation
export const addConversation = async (req, res) => {
    try {
        const freelancer = req.body.freelancer;
        const client = req.body.client;

        // Check if Freelancer is Exists in Freelancers

        // Check if Client is Exists in Clients

        const data = await conversation.findOne({freelancer});

        console.log(data);

        if(data) {
            if(data.client == client) {
                return res.status(400).json({ msg:"Conversation is already exists!"});
            }
        }

        const newConversation = new conversation({
            ...req.body,
        });

        await newConversation.save();

        const newConversationData = await conversation.find(newConversation._id).populate('freelancer', {_id: 1, name: 1, email: 1}).populate('client', {_id: 1, name: 1, email: 1});

        res.status(200).json({ msg:"Conversation has been created successfuly.", newConversationData});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Update Conversation
export const updateConversation = async (req, res) => {
    try {
        const conversationId = req.params.id;
        const conversationToUpdate = await conversation.findById(conversationId);

        if(conversationToUpdate) {
            const filter = { _id: conversationId };
            const update = { $set: { conversationName: req.body.conversationName, conversationCategory: req.body.conversationCategory, conversationPosts: req.body.conversationPosts, clientMemberIds: req.body.clientMemberIds, freelancerMemberIds: req.body.freelancerMemberIds, membersCount: req.body.membersCount } };
            await conversation.updateOne(filter, update);
            return res.status(200).json({ msg:"Conversation has been updated successfuly." });
        }

        res.status(400).json({ msg:"There is no conversation with such id to update." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Delete Conversation
export const deleteConversation = async (req, res) => {
    try {
        const conversationId = req.params.id
        const conversationToDelete = await conversation.findById(conversationId);

        if(conversationToDelete){
            const filter = { _id: conversationId };

            await conversation.deleteOne(filter);
            res.status(200).json({ msg:"Conversation has been deleted successfuly." });
        }
        else {
            res.status(400).json({ msg:"Conversation deletion failed." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}