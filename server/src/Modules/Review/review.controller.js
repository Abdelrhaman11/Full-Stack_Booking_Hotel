import { reviewModel } from "../../../DB/Models/review.model.js";
import { hotelModel } from "../../../DB/Models/hotel.model.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";

export const addReview = asyncHandler(async (req, res, next) => {
  const { hotelId } = req.params;
  const { rating, comment } = req.body;

  // Check hotel
  const hotel = await hotelModel.findById(hotelId);

  if (!hotel) {
    return next(new Error("Hotel not found", { cause: 404 }));
  }


  // If user doesn't want to add rating or comment
  if (rating === undefined && comment === undefined) {
    return res.status(200).json({
      success: true,
      message: "No review provided",
    });
  }

  // Check existing review
  const existingReview = await reviewModel.findOne({hotel: hotelId,user: req.user._id});

  if (existingReview) {
    return next(new Error("You already reviewed this hotel", {cause: 409,}));
  }

  // Create review
  const review = await reviewModel.create({
    hotel: hotelId,
    user: req.user._id,
    rating,
    comment,
  });



  return res.status(201).json({success: true,message: "Review added successfully",result: review,});


});


export const getHotelReviews = asyncHandler(async (req, res, next) => {

  const { hotelId } = req.params;

  const reviews = await reviewModel.find({hotel: hotelId}).populate({
    path: "user",
    select: "_id name"
  });

  const ratingReviews = reviews.filter(
    (review) => review.rating !== undefined
  );

  const totalRating = ratingReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  const averageRating =
    ratingReviews.length > 0 ? totalRating / ratingReviews.length : 0;

  return res.status(200).json({success: true, results: reviews, rating: {
      average: Number(averageRating.toFixed(1)),
      count: ratingReviews.length
    }
  });

});