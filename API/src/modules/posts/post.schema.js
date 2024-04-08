
import Joi from "joi";

export const postSchema = Joi.object({
    communityId: Joi.string().required(),
    posterId: Joi.string().required(),
    posterType: Joi.string().required(),
    caption: Joi.string().required(),
    likes: Joi.number(),
    Comments: Joi.array()
});
