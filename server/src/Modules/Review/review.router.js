import { Router } from "express";

import { addReview , getHotelReviews } from "./review.controller.js";
import { isAuthenticated } from "../../Middleware/authentication.middleware.js";
import { isValid } from "../../Middleware/validation.middleware.js";
import { reviewSchema } from "./review.validation.js";

const router = Router();

router.post("/:hotelId", isAuthenticated, isValid(reviewSchema, ["body"]), addReview);
router.get("/:hotelId", getHotelReviews);

export default router;