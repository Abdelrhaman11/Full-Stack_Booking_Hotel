import joi from "joi";

export const reviewSchema = joi.object({
  rating: joi.number().integer().min(1).max(5),
  comment: joi.string().trim().max(500),

});