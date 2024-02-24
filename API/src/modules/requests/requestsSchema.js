
import Joi from "joi";

export const requestSchema = Joi.object({
    freelancerId: Joi.string().required(),
    clientId: Joi.string().required(),
    serviceId: Joi.string().required(),
    requestStatus: Joi.string()
});

export const updateRequestSchema = Joi.object({
    freelancerId: Joi.string(),
    clientId: Joi.string(),
    serviceId: Joi.string(),
    requestStatus: Joi.string()
});