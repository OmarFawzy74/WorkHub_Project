import mongoose from "mongoose";
import chatbotConversation from "../../../DB/models/chatbotConversation_model.js";

// Get All Conversations
export const getAllConversations = async (req, res) => {
    try {
        const allConversations = await chatbotConversation.find();
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

// Get A Conversation By User ID
export const getConversationsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const role = req.params.role;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(401).json({ msg: "Invalid Id" });
        }

        const conversationData = await chatbotConversation.find({ senderId: userId });

        if(!conversationData[0]) {
            const newConversation = new chatbotConversation({
                senderId : userId,
                senderType : role
            });
    
            await newConversation.save();

            return res.status(200).json({ msg: "Conversation created successfully" });
        }
        else {
            conversationData.map(async (conversation) => {
                if(conversation.senderMessage == undefined && conversation.chatbotResponse == undefined) {
                    const filter = { _id: conversation._id };
                    await chatbotConversation.deleteOne(filter);
                }
            })

            const newConversationData = await chatbotConversation.find({ senderId: userId });
            return res.status(200).json({ newConversationData });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: "Server Error" });
    }
};

// Add user Message
export const addUserMessage = async (req, res) => {
    try {
        const conversationId = req.body.conversationId;
        const message = req.body.message;

        let conversationData = await chatbotConversation.findById(conversationId);

        if(!conversationData) {
            return res.status(400).json({ msg:"No Conversation Found" });
        }

        const filter = { _id: conversationId };
        const update = {
                $set: { senderMessage: message },
        };

        await chatbotConversation.updateOne(filter, update);

        res.status(200).json({ msg:"Message added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

// Add chatbot Message
export const addChatbotResponse = async (req, res) => {
    try {
        const conversationId = req.body.conversationId;
        const responseData = req.body.response;

        const filter = { _id: conversationId };
        const update = {
            $set: { chatbotResponse: responseData },
        };

        await chatbotConversation.updateOne(filter, update);

        return res.status(200).json({ msg:"Response has been added successfuly."});
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}