import { Types } from "mongoose";

export const objectIdValidation = (value, helper) => {
    if (Types.ObjectId.isValid(value)) return true;
    return helper.message("Invalid ObjectId");
}


export const validation = (Schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.query};
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

// export const validateParams = (schema) => {
//     return (req, res, next) => {
//         if(typeof req.params.id === 'string') {
//             req.params.id = parseInt(req.params.id);

//             const data = req.params;
//             const validationResult = schema.validate(data);
            
//             if (validationResult.error) {
//                 return res.status(400).json({
//                     error: validationResult.error.details[0].message,
//                 });
//             }
//         }
//         else{

//         }
//         next();
//     }
// }