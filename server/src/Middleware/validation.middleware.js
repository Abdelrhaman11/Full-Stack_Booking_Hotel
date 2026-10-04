import { Types } from "mongoose";

export const isValid = (schema, sources) => {
    return (req, res, next) => {

        const data = {};

        if (sources.includes("body")) {
            Object.assign(data, req.body);
        }

        if (sources.includes("params")) {
            Object.assign(data, req.params);
        }

        if (sources.includes("query")) {
            Object.assign(data, req.query);
        }

        const validationResult = schema.validate(data, {
            abortEarly: false
        });

        if (validationResult.error) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                validationError: validationResult.error.details
                    .map(err => err.message)
                    .join(",")
            });
        }

        next();
    };
};

export const isValidObjectId = (value , helper)=>{
    return Types.ObjectId.isValid(value) ? true : helper.message("Invalid ObjectId")
}