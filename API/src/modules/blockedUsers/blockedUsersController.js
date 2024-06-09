
import blockedUsers_model from "../../../DB/models/blockedUsers_model.js";


export const getBlockedUsers = async (req, res) => {
    try {
        const blockedusersdata = await blockedUsers_model.find();

        if(blockedusersdata[0]) {
            return res.status(200).json({blockedusersdata});
        }

        res.status(404).json({msg:"There Is No Blocked Users"});
    } catch (error) {
        console.log(error);
        res.status(500).json("Somthing went wrong!");
    }
}

export const checkIfBlocked = async (req, res) => {
    try {
        const id = req.params.id;

        const blockeduserdata = await blockedUsers_model.find({userId: id});

        if(blockeduserdata[0]) {
            return res.status(400).json({msg:"You Are Blocked From Accessing Your Account For Violating Website's Policy."});
        }

        res.status(200).json({msg:"Not Blocked"});
    } catch (error) {
        console.log(error);
        res.status(500).json("Somthing went wrong!");
    }
}

export const blockUser = async (req, res) => {
    try {
        const id = req.params.id;
        const blockeduserdata = await blockedUsers_model.find({userId: id});

        if(blockeduserdata[0]) {
            return res.status(400).json({msg:"User Already Blocked."});
        }

        const newBlockedUser = new blockedUsers_model({
            userId: id,
        });

        await newBlockedUser.save();

        res.status(200).json({msg:"User blocked successfuly."});
    } catch (error) {
        console.log(error);
        res.status(500).json("Somthing went wrong!");
    }
}