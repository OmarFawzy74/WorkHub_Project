
import request from "../../../DB/models/request_model.js";

//Unfinished Tasks

// 2. Check Authentication
// 3. Check Authorization
// Check Freelancer ID
// Check Client ID
// Check Service ID
// Check If Status Accepted Add It Orders

export const getAllRequests = async (req, res) => {
    try {
        const allRequests = await request.find();
        if(allRequests.length !== 0) {
            res.status(200).send(allRequests);
        }
        else {
            res.status(200).send("No requests found!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const addRequest = async (req, res) => {
    try {
        const newRequest = new request({
            ...req.body,
        });

        await newRequest.save();
        res.status(200).send("Request has been created successfuly.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const updateRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const requestToUpdate = await request.findById(requestId);

        if(requestToUpdate) {
            const filter = { _id: requestId }; // specify the condition to match the document
            const update = { $set: { freelancerId: req.body.freelancerId, clientId: req.body.clientId, requestStatus: req.body.requestStatus, serviceId: req.body.serviceId} }; // specify the update operation

            await request.updateOne(filter, update);
            res.status(200).send("Request has been updated successfuly.");
        }
        else {
            res.status(200).send("There is no request with such id to update.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const requestId = req.params.id
        const requestToDelete = await request.findById(requestId);

        if(requestToDelete){
            const filter = { _id: requestId };

            await request.deleteOne(filter);
            res.status(200).send("Request has been deleted successfuly.");
        }
        else {
            res.status(200).send("There is no request with such id to delete.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}