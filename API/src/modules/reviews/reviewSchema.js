
import Joi from "joi";

export const reviewSchema = Joi.object({
    reviewDesc:Joi.string().max(30)
});
