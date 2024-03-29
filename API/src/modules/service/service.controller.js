
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
export const createService = async (req, res, next) => {
    try {
        const isService = await Service.find({ serviceTitle:req.body.serviceTitle });
        if (isService.length !== 0) {
            return next(new Error("Service is already exist", { cause: 401 }));
        }

        console.log(req.files);

        let images = req.files;

        if(images.length == 0) {
            return next(new Error("Images are required", { cause: 401 }));
        }

        // let data = [];

        // images.forEach(image => {
        //     data.push(image.filename);
        // });

        // console.log(req.file.filename);

        const service = {...req.body, serviceCover_url: files};
        console.log(service);
        const newService = await Service.create(service);
        res.status(201).json({ success: true, message: "here u r "});
    } catch (error) {
        console.log(error);
    }
};

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
};