
import Joi from "joi";

export const clientSchema = Joi.object({
    clientName: Joi.string().required(),
    clientEmail: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    clientPassword: Joi.string(),
    clientConfirmPassword: Joi.string(),
    clientNewPassword: Joi.string(),
    clientConfirmNewPassword: Joi.string(),
    clientImage_url: Joi.string().required(),
    clientDesc: Joi.string().max(100).required(),
    clientCountry: Joi.string().required(),
    clientLastLogin: Joi.string().isoDate()
});

export const paramsSchema = Joi.object({
    id: Joi.string().required(),
});