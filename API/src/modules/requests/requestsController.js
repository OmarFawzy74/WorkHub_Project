
import request from "../../../DB/models/request_model.js";

// Get All Requests
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

        const data = await request.find(filter);

        if(data[0]) {
            if(data[0].requestStatus === "Pending") {
                return res.status(200).json({ msg:"Request has already been sent." });
            }
        }

        const newRequest = new request({
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
        const requestToUpdate = await request.findById(requestId);

        if(requestToUpdate) {
            const filter = { _id: requestId };
            const update = { $set: { requestStatus: req.body.requestStatus} };
            const process = await request.updateOne(filter, update);

            if(process) {
                if(req.body.requestStatus === "Approved") {
                    const freelancerId = req.body.freelancerId;
                    const clientId = req.body.clientId;
                    const serviceId = req.body.serviceId;
                    // const serviceData = await request.findById(serviceId);

                    const newOrder = new order({
                        requestId,
                        freelancerId,
                        clientId,
                        serviceId
                    });
            
                    await newOrder.save();
                    res.status(200).send("Order has been created successfuly.");

                    // addOrder();
                    return res.status(200).send("Request " + req.body.requestStatus + " successfuly.");
                }
                else {
                    return res.status(200).send("Request " + req.body.requestStatus + " successfuly.");
                }
            }
            res.status(400).send("Request status update failed");
        }
        res.status(404).send("Request not found!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

// Delete Request
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