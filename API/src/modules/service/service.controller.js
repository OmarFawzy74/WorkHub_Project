
import mongoose from "mongoose";
import Service from "../../../DB/models/service_model.js";
import fs from "fs";
import path from 'path'; // Import path module to handle file paths
import { fileURLToPath } from 'url';


// Get all services
export const getAllServices = async (req, res, next) => {

    const services = await Service.find().populate("freelancerId");
    if (services.length == 0) {
        return next(new Error("No services found", { cause: 404 }));
    }

    services.map((service) => {
        service.freelancerId.image_url = "http://" + req.hostname + ":3000/" + service.freelancerId.image_url;
    });

    services.map((services) => {
        services.serviceCover_url = "http://" + req.hostname + ":3000/" + services.serviceCover_url;
    });

    services.map((service) => {
        var images_url_array = [];

        service.serviceImages_url.map((image_url) => {

            var url = "http://" + req.hostname + ":3000/" + image_url;

            images_url_array.push(url);
        });

        service.serviceImages_url = images_url_array;

    });

    res.status(200).json({ success: true, message: "here u r", services });
};

// Create a new service
export const createService = async (req, res) => {
    try {
        const { serviceTitle, serviceShortDesc, deliveryTime, revisionNumber, freelancerId, serviceShortTitle, serviceCategoryId, serviceDesc, servicePrice, features } = req.body

        const isService = await Service.find({ serviceTitle });
        if (isService.length !== 0) {
            return res.status(404).json({ success: false, message: "Service already exists" });
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

        res.status(201).json({ success: true, message: "Service created successfully", newService });
    } catch (error) {
        // console.log(req);
        console.log(req.body);
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
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
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new Error("Invalid service id", { cause: 404 }));
        }
        const data = await Service.findById(id);
        if (!data) {
            return next(new Error("Service not found", { cause: 404 }));
        }
        const filter = { _id: id }
        const process = await Service.deleteOne(filter);

        if (process) {
            fs.unlinkSync("./src/middleware/upload/" + data.serviceCover_url); //delete old image

            data.serviceImages_url.forEach((image_url) => {
                fs.unlinkSync("./src/middleware/upload/" + image_url); //delete old image
            })

            res.status(200).json({ success: true, message: "Service deleted successfully", process });
        }

        next(new Error("Service not found", { cause: 404 }));

    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
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
        const update = { $set: { serviceCover_url: cover_url } };

        await Service.updateOne(filter, update);


        res.status(200).json({ msg: "image uploaded successfuly" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
};

// Upload Images
export const uploadImages = async (req, res, next) => {

    try {

        if (!req.files) {
            return res.status(404).send({ success: false, message: "images are required" });
        }

        const id = req.params.id;

        if (id == undefined) {
            return res.status(404).send({ success: false, message: "id is required" });
        }

        const images_url = [];

        for (let index = 0; index < req.files.length; index++) {

            const fileName = req.files[index].filename;
            images_url.push(fileName);
        }

        const filter = { _id: id };
        const update = { $set: { serviceImages_url: images_url } };

        await Service.updateOne(filter, update);

        res.status(200).json({ msg: "images uploaded successfuly" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
}