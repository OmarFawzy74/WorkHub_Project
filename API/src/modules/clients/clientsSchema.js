
import Joi from "joi";

export const clientSchema = Joi.object({
    clientName: Joi.string().required(),
    clientEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    clientPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    clientConfirmPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    clientImage_url: Joi.string().required(),
    clientDesc: Joi.string().max(100).required(),
    clientCountry: Joi.string().required(),
    clientLastLogin: Joi.string().isoDate()
});

export const paramsSchema = Joi.object({
    id: Joi.string().required(),
});