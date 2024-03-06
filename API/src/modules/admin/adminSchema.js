
import Joi from "joi";

export const updateInfoSchema = Joi.object({
    username: Joi.string(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    image_url: Joi.string()
});