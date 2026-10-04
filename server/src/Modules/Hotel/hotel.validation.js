import joi from "joi";
import { isValidObjectId } from "../../Middleware/validation.middleware.js";


export const createHotelSchema= joi.object({

    title: joi.string().min(3).max(100).required(),
    content: joi.string().min(10).max(1000).required(),
    price: joi.number().positive().required(),
    bed: joi.number().integer().positive().required(),
    location: joi.string().required(),
    fromDate: joi.date().required(),
    toDate: joi.date().greater(joi.ref("fromDate")).required(),
    postedBy: joi.string().custom(isValidObjectId),

}).required()


export const updateHotelSchema= joi.object({

    title: joi.string().min(3).max(100),
    content: joi.string().min(10).max(1000),
    price: joi.number().positive(),
    bed: joi.number().integer().positive(),
    location: joi.string(),
    fromDate: joi.date(),
    toDate: joi.date().greater(joi.ref("fromDate")),
    postedBy: joi.string().custom(isValidObjectId),

}).min(1).required()
