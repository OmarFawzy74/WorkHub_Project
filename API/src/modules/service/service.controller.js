
import mongoose from "mongoose";
import Service from "../../../DB/models/service_model.js";

// Get all services
export const getAllServices = async (req, res, next) => {

    const services = await Service.find();
    if (services.length==0) {
        return next(new Error("No services found", { cause: 404 }));
    }
    res.status(200).json({ success: true, message: "here u r", services });
};

// Create a new service
export const createService = async (req, res) => {
    try {
        const {serviceTitle, serviceShortDesc, deliveryTime, revisionNumber, freelancerId, serviceShortTitle, serviceCategoryId, serviceDesc, servicePrice, features} = req.body

        const isService = await Service.find({ serviceTitle });
        if (isService.length !== 0) {
            return res.status(404).json({ success: false, message: "Service already exists"});
        }

        const newServiceData = {
            deliveryTime,
            serviceCategoryId,
            freelancerId,
            serviceShortDesc,
            serviceShortTitle,
            servicePrice,
            serviceDesc,
            serviceTitle,
            revisionNumber,
            features
        };

        const newService = new Service(newServiceData);

        await newService.save();

        res.status(201).json({ success: true, message: "Service created successfully", newService});
    } catch (error) {
        // console.log(req);
        console.log(req.body);
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error"});
    }
}

// Update a service by ID
export const updateService = async (req, res, next) => {
    const { id } = req.params;
    const service = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error("Service not found", { cause: 404 }));
    }
    const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
    if (!updateService) {
        return next(new Error("service can't updated", {
            cause: 404
        }))
    }
    res.status(200).json({ success: true, message: "service updated successfully", updatedService });
};

// Delete a service by ID
export const deleteService = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new Error("Invalid service id", { cause: 404 }));
    }
    const process = await Service.findByIdAndDelete(id);

    if(process) {
        res.status(200).json({ success: true, message: "Service deleted successfully", process });
    }

    next(new Error("Service not found", { cause: 404 }));
};

// Get a service by ID
export const getServiceById = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ success: true, message: "Service not found" });
    }

    const service = await Service.findById(id);
    if (service) {
        res.status(200).json(service);
    } else {
        return next(new Error("Service not found", { cause: 404 }));
    }
};

// Get Freelancer Services
export const getFreelancerServices = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({ success: false, message: "Invalid id" });
    }

    const service = await Service.find({ freelancer: id });

    if (service) {
        return res.status(200).json(service);
    }
    next(new Error("Service not found", { cause: 404 }));
};

// Upload Cover Image
export const uploadCoverImage = async (req, res, next) => {

    if(!req.file) {
        return res.status(404).send({ success: false, message: "Cover image is required" });
    }

    res.status(200).json({ msg:"image uploaded successfuly" });
};

// Upload Images
export const uploadImages = async (req, res, next) => {

    if(!req.files) {
        return res.status(404).send({ success: false, message: "images are required" });
    }

    res.status(200).json({ msg:"images uploaded successfuly" });
}