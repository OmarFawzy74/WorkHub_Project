import Joi from "joi";

export const addProfessorsSchema = Joi.object({
    courseTitle: Joi.string().required(),
    courseDesc: Joi.string().required(),
    courseDuration: Joi.string().required()
});


export const updateProfessorsSchema = Joi.object({
    courseTitle: Joi.string(),
    courseDesc: Joi.string(),
    courseDuration: Joi.string()
});

