import Joi from "joi";

export const createService = Joi.object({
    serviceTitle: Joi.string(),
    serviceDesc: Joi.string(),
    servicePrice: Joi.number(),
    serviceShortTitle: Joi.string(),
    serviceCategory: Joi.string(),
    serviceCover_url: Joi.string(),
    serviceImages_url: Joi.array(),
    deliveryTime: Joi.number(),
    freelancer: Joi.string(),
    features: Joi.array(),
});


export const updateServiceSchema = Joi.object({
    serviceTitle: Joi.string(),
    serviceDesc: Joi.string(),
    servicePrice: Joi.number(),
    serviceShortTitle: Joi.string(),
    deliveryTime: Joi.date(),
    features: Joi.string(),
    sales: Joi.number(),
    totalRating: Joi.number()
});