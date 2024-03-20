import Joi from "joi";

export const CoursesSchema = Joi.object({
    courseTitle: Joi.string().required(),
    courseDesc: Joi.string().required(),
    courseDuration: Joi.string().required()
});


export const updateCoursesSchema = Joi.object({
    courseTitle: Joi.string(),
    courseDesc: Joi.string(),
    courseDuration: Joi.string()
});

