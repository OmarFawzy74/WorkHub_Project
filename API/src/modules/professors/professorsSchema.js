
import Joi from "joi";

export const addProfessorsSchema = Joi.object({
    proffName:Joi.string().required(),
    proffTitle:Joi.string().required(),
    ProffDesc:Joi.string()
});


export const updateProfessorsSchema = Joi.object({
    proffName:Joi.string(),
    proffTitle:Joi.string(),
    ProffDesc:Joi.string()
});

