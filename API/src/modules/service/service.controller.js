import mongoose from "mongoose";
import Service from "../../../DB/models/service_model.js"

// Get all services
export const getAllServices = async (req, res) => {

    const services = await Service.find();
    if (!services) {
        return next(new Error("No services", { cause: 404 }));
    }
    res.status(200).json({success:true, message:"here u r",services});

};

// Create a new service
export const createService = async (req, res) => {
    const isService = await service.find(req.body.serviceTitle);
    if (isService) {
        return next(new Error("service is already exist",{cause: 401}));
    }
    const service = req.body;
    const newService = await Service.create(service);
    res.status(201).json({success:true, message:"here u r ", newService});

};

// Update a service by ID
export const updateService = async (req, res) => {
    const { id } = req.params;
    const service = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error("Service not found", { cause: 404 }));
    }
    const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
    if (!updateService) {
        return next(new Error("service can't updated", {
            cause:404
        }))
    }
    res.status(200).json({success:true, message:"service updated successfully",updatedService});

};

// Delete a service by ID
export const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Service not found");
    }
    await Service.findByIdAndRemove(id);
    res.status(200).json({success:true,  message: "Service deleted successfully" });

};

// Get a service by ID
export const getServiceById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send({success:true, message:"Service not found"});
    }


    const service = await Service.findById(id);
    if (service) {
        res.status(200).json(service);
    } else {
    return nextnext(new Error("Service not found",{cause:404}));
    }

};
