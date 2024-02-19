import { Types } from "mongoose";

export const objectIdValidation = (value, helper) => {
    if (Types.ObjectId.isValid(value)) return true;
    return helper.message("Invalid ObjectId");
}


export const validation = (Schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.query, ...req.params };
        const validationResult = Schema.validate(data, {
            abortEarly: false,
        });
        if (validationResult.error) {
            return next(
                new Error(
                    validationResult.error.message,
                    { cause: 400 }
                )
            );
        }
        next();
    }
    
}