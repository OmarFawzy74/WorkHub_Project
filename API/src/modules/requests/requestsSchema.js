
import Joi from "joi";

export const requestSchema = Joi.object({
    clientId: Joi.string().required(),
    serviceId: Joi.string().required(),
});

export const updateRequestSchema = Joi.object({
    freelancerId: Joi.string(),
    requestStatus: Joi.string()
});