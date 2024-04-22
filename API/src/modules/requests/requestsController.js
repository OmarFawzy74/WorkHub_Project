
import order_model from "../../../DB/models/order_model.js";
import request_model from "../../../DB/models/request_model.js";

// Get All Requests
export const getAllRequests = async (req, res) => {
    try {
        var allRequests = await request_model.find().populate("clientId").populate("serviceId");

        if(allRequests.length == 0) {
            return res.status(404).json({ msg:"No requests found!" });
        }

        const requests = allRequests.map((request) => {
            const modifiedRequest = { ...request._doc }; // Create a copy of the service object
            modifiedRequest.serviceId = { ...modifiedRequest.serviceId._doc }; // Create a copy of the freelancerId object
            modifiedRequest.serviceId.serviceCover_url = "http://" + req.hostname + ":3000/" + modifiedRequest.serviceId.serviceCover_url;
            return modifiedRequest;
        });

        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Get Client Requests
export const getClientRequests = async (req, res) => {
    try {
        const clientId = req.params.id
        var allRequests = await request_model.find({clientId: clientId}).populate("clientId").populate("serviceId");

        if(allRequests.length == 0) {
            return res.status(404).json({ msg:"No requests found!" });
        }

        const requests = allRequests.map((request) => {
            const modifiedRequest = { ...request._doc }; // Create a copy of the service object
            modifiedRequest.serviceId = { ...modifiedRequest.serviceId._doc }; // Create a copy of the freelancerId object
            modifiedRequest.serviceId.serviceCover_url = "http://" + req.hostname + ":3000/" + modifiedRequest.serviceId.serviceCover_url;
            return modifiedRequest;
        });

        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Get Freelancer Requests
export const getFreelancerRequests = async (req, res) => {
    try {
        const freelancerId = req.params.id;
        var allRequests = await request_model.find({freelancerId: freelancerId}).populate("clientId").populate("serviceId");

        if(allRequests.length == 0) {
            return res.status(404).json({ msg:"No requests found!" });
        }

        const requests = allRequests.map((request) => {
            const modifiedRequest = { ...request._doc }; // Create a copy of the service object
            modifiedRequest.serviceId = { ...modifiedRequest.serviceId._doc }; // Create a copy of the freelancerId object
            modifiedRequest.serviceId.serviceCover_url = "http://" + req.hostname + ":3000/" + modifiedRequest.serviceId.serviceCover_url;
            return modifiedRequest;
        });

        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

export const getUserRequests = async (req, res) => {
    try {
        const userId = req.params.id;
        const role = req.params.role
        var allRequests

        if(role == "freelancer") {
            var allRequests = await request_model.find({freelancerId: userId}).populate("clientId").populate("serviceId");
        }
        else if(role == "client") {
            var allRequests = await request_model.find({clientId: userId}).populate("clientId").populate("serviceId");
        }
        else {
            return res.status(404).json({ msg:"Unauthorized!" });
        }

        if(allRequests.length == 0) {
            return res.status(404).json({ msg:"No requests found!" });
        }

        const requests = allRequests.map((request) => {
            const modifiedRequest = { ...request._doc }; // Create a copy of the service object
            modifiedRequest.serviceId = { ...modifiedRequest.serviceId._doc }; // Create a copy of the freelancerId object
            modifiedRequest.serviceId.serviceCover_url = "http://" + req.hostname + ":3000/" + modifiedRequest.serviceId.serviceCover_url;
            return modifiedRequest;
        });

        res.status(200).json(requests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Add Request
export const addRequest = async (req, res) => {
    try {
        const filter = {
            $and: [
                { clientId: req.body.clientId },
                { freelancerId: req.body.freelancerId },
                { serviceId: req.body.serviceId }
            ]
        };

        const data = await request_model.find(filter);

        if(data[0]) {
            if(data[0].requestStatus === "Pending") {
                return res.status(200).json({ msg:"Request has already been sent." });
            }
        }

        const newRequest = new request_model({
            ...req.body,
        });

        await newRequest.save();
        res.status(200).json({ msg:"Request has been created successfuly." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Update Request Status
export const updateRequestStatus = async (req, res) => {
    try {
        const requestId = req.params.id;
        const requestToUpdate = await request_model.findById(requestId);

        if(requestToUpdate) {

            if(requestToUpdate.requestStatus == "Approved" || requestToUpdate.requestStatus == "Decline") {
                return res.status(404).json({ msg:"Request Already " + requestToUpdate.requestStatus });
            }

            const filter = { _id: requestId };
            const update = { $set: { requestStatus: req.body.requestStatus} };
            const process = await request_model.updateOne(filter, update);

            if(process) {
                if(req.body.requestStatus === "Approved") {
                    const freelancerId = req.body.freelancerId;
                    const clientId = requestToUpdate.clientId;
                    const serviceId = requestToUpdate.serviceId;

                    // const serviceData = await request.findById(serviceId);

                    const newOrder = new order_model({
                        requestId,
                        freelancerId,
                        clientId,
                        serviceId
                    });
            
                    await newOrder.save();
                    // res.status(200).send("Order has been created successfuly.");

                    // addOrder();
                    return res.status(200).json({ msg:"Request Approved Successfuly." });
                }
                else {
                    return res.status(200).json({ msg:"Request Declined successfuly." });
                }
            }
            return res.status(400).json({ msg:"Request status update failed" });
        }
        res.status(404).json({ msg:"Request not found!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// Delete Request
export const deleteRequest = async (req, res) => {
    try {
        const requestId = req.params.id
        const requestToDelete = await request_model.findById(requestId);

        if(requestToDelete){
            const filter = { _id: requestId };

            await request_model.deleteOne(filter);
            return res.status(200).json({ msg:"Request has been Canceled." });
        }
        else {
            res.status(200).json({ msg:"There is no request with such id to delete." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg:"Somthing went wrong!" });
    }
}

// // Approve Request
// export const updateRequestStatus = async (req, res) => {
//     try {
//         const requestId = req.params.id;
//         const requestToUpdate = await request.findById(requestId);

//         if(requestToUpdate) {
//             const filter = { _id: requestId };
//             const update = { $set: { requestStatus: req.body.requestStatus} };
//             const process = await request.updateOne(filter, update);

//             if(process) {
//                 if(req.body.requestStatus === "approved") {
//                     const freelancerId = req.body.freelancerId;
//                     const clientId = req.body.clientId;
//                     const serviceId = req.body.serviceId;
//                     const serviceData = await request.findById(serviceId);

//                     addOrder();
//                     return res.status(200).send("Request " + req.body.requestStatus + " successfuly.");
//                 }
//                 else {
//                     return res.status(200).send("Request " + req.body.requestStatus + " successfuly.");
//                 }
//             }
//             res.status(400).send("Request status update failed");
//         }
//         res.status(404).send("Request not found!");
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Somthing went wrong!");
//     }
// }

// // Decline Request
// export const updateRequestStatus = async (req, res) => {
//     try {
//         const requestId = req.params.id;
//         const requestToUpdate = await request.findById(requestId);

//         if(requestToUpdate) {
//             const filter = { _id: requestId };
//             const update = { $set: { requestStatus: req.body.requestStatus} };
//             const process = await request.updateOne(filter, update);

//             if(process) {
//                 if(req.body.requestStatus === "approved") {
//                     const freelancerId = req.body.freelancerId;
//                     const clientId = req.body.clientId;
//                     const serviceId = req.body.serviceId;
//                     const serviceData = await request.findById(serviceId);

//                     addOrder();
//                     return res.status(200).send("Request " + req.body.requestStatus + " successfuly.");
//                 }
//                 else {
//                     return res.status(200).send("Request " + req.body.requestStatus + " successfuly.");
//                 }
//             }
//             res.status(400).send("Request status update failed");
//         }
//         res.status(404).send("Request not found!");
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Somthing went wrong!");
//     }
// }