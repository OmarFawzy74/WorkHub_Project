
import Joi from 'joi';

const validations = {
    sigupSchema: {
        body:Joi.object().required().keys({
            username:Joi.string().min(5).required(),
            email: Joi.string().email().required().messages({
                "any.required": "cutsom ***** error",
              }),
            password: Joi.string().min(5).required(),

        }),

    },
    loginSchema: {
        body:Joi.object().required().keys({
            email: Joi.string().email().required().messages({
                "any.required": "cutsom ***** error",
              }),
            password:Joi.string().required().min(5),
            
          
        })
    }
}

export default validations