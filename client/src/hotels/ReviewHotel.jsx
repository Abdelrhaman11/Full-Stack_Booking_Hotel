import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiServices } from "../../src/services/api.js";

export default function ReviewHotel({ hotelId }) {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);


  async function loadReviews() {

    try {

      const res = await apiServices.getHotelReviews(hotelId);

      setReviews(res.results);
      setAverageRating(res.rating.average);
      setReviewsCount(res.rating.count);

    } catch (error) {

      console.log(error);

    }

  }


  async function handleAddReview(e) {

    e.preventDefault();

    // User can submit without rating/comment
    if (!rating && !comment.trim()) {
      return;
    }

    try {

      setReviewLoading(true);

      const data = {};

      if (rating) {
        data.rating = Number(rating);
      }

      if (comment.trim()) {
        data.comment = comment.trim();
      }

      const response = await apiServices.addReview(hotelId,data);

      toast.success(response.message);

      setRating("");
      setComment("");

      // Reload reviews after adding
      await loadReviews();

    } catch (error) {

  console.log("ADD REVIEW ERROR:", error);
  console.log("RESPONSE:", error.response?.data);

  toast.error(
    error.response?.data?.message ||
    "Something went wrong"
  );

} finally {

      setReviewLoading(false);

    }

  }


  useEffect(() => {

    loadReviews();

  }, [hotelId]);


 return (
  <div className="container my-5">

    {/* Reviews Section */}
    <div className="row justify-content-center">

      <div className="col-12 col-lg-10">

        {/* Reviews Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              Guest Reviews
            </h2>

            <p className="text-muted mb-0">
              What guests are saying about this hotel
            </p>
          </div>

        </div>


        {/* Rating Summary */}
        <div
          className="card border-0 shadow-sm mb-4"
          style={{
            borderRadius: "16px",
            background: "#f8f9fa"
          }}
        >

          <div className="card-body p-4">

            <div className="row align-items-center">

              {/* Average Rating */}
              <div className="col-md-4 text-center border-end">

                <div
                  className="fw-bold"
                  style={{
                    fontSize: "42px",
                    color: "#0d6efd"
                  }}
                >
                  {averageRating}
                </div>

                <div className="mb-2">

                  {"★".repeat(
                    Math.round(averageRating)
                  )}

                  {"☆".repeat(
                    5 - Math.round(averageRating)
                  )}

                </div>

                <p className="text-muted mb-0">
                  Based on {reviewsCount} reviews
                </p>

              </div>


              {/* Rating Text */}
              <div className="col-md-8 ps-md-5 mt-4 mt-md-0">

                <h5 className="fw-semibold">
                  Overall Experience
                </h5>

                <p className="text-muted mb-0">
                  See what other guests experienced
                  during their stay.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Reviews List */}
        <div className="mb-5">

          {reviews.length > 0 ? (

            reviews.map((review) => (

              <div
                key={review._id}
                className="card border-0 shadow-sm mb-3"
                style={{
                  borderRadius: "16px"
                }}
              >

                <div className="card-body p-4">

                  {/* User + Rating */}
                  <div className="d-flex justify-content-between align-items-start">

                    <div className="d-flex align-items-center">

                      {/* Avatar */}
                      <div
                        className="d-flex justify-content-center align-items-center bg-primary text-white fw-bold me-3"
                        style={{width: "45px",height: "45px",borderRadius: "50%"}}
                      >
                        {review.user?.name?.charAt(0)?.toUpperCase()}
                      </div>


                      <div>

                        <h6 className="fw-bold mb-1"> {review.user?.name || "Anonymous"}</h6>

                        <small className="text-muted">Guest</small>

                      </div>

                    </div>


                    {/* Rating */}
                    {review.rating && (

                      <div
                        className="px-2 py-1"
                        style={{ background: "#fff3cd",borderRadius: "8px"}}>

                        <span>{"★".repeat(review.rating)}</span>

                      </div>

                    )}

                  </div>


                  {/* Comment */}
                  {review.comment && (

                    <div className="mt-3">

                      <p className="mb-0 text-secondary">"{review.comment}"</p>

                    </div>

                  )}

                </div>

              </div>

            ))

          ) : (

            <div className="text-center py-5" >

              <div style={{ fontSize: "45px"}}>⭐</div>

              <h5 className="fw-bold mt-3">No reviews yet</h5>

              <p className="text-muted">Be the first guest to review this hotel.</p>

            </div>

          )}

        </div>


        {/* Add Review */}
        <div className="card border-0 shadow-sm"style={{borderRadius: "18px"}}>

          <div className="card-body p-4 p-md-5">

            <div className="mb-4">

              <h3 className="fw-bold mb-1"> Write a Review</h3>

              <p className="text-muted mb-0"> Share your experience with other guests. </p>

            </div>


            <form onSubmit={handleAddReview}>

              {/* Rating */}
              <div className="mb-4">

                <label className="form-label fw-semibold"> Your Rating </label>

                <select className="form-select" value={rating}onChange={(e) =>
                    setRating(e.target.value)
                  }
                  style={{ borderRadius: "10px", padding: "12px"}}
                >

                  <option value=""> Select your rating </option>
                  <option value="1"> ⭐ </option>
                  <option value="2"> ⭐⭐ </option>
                  <option value="3"> ⭐⭐⭐ </option>
                  <option value="4"> ⭐⭐⭐⭐ </option>
                  <option value="5">⭐⭐⭐⭐⭐</option>

                </select>

              </div>


              {/* Comment */}
              <div className="mb-4">

                <label className="form-label fw-semibold"> Your Comment </label>

                <textarea className="form-control" rows="4" placeholder="Tell us about your experience..." value={comment}onChange={(e) =>
                    setComment(e.target.value)
                  }
                  style={{ borderRadius: "10px", resize: "none"}}/>

              </div>


              {/* Submit */}
              <button type="submit" className="btn btn-primary px-4 py-2" disabled={reviewLoading}style={{ borderRadius: "10px"}} >

                {reviewLoading ? (

                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />Submitting...</>
                ) : (
                  "Submit Review"
                )}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}