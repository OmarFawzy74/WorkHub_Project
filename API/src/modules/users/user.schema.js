import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"))
        .required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    age: Joi.number().required().min(15).max(80)

});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .max(20)
        .pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"))
        .required()
});