import mongoose, { model, Schema, Types } from "mongoose";


const reviewSchema = new Schema(
  {
    hotel: {
      type:Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    user: {
      type:Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ hotel: 1, user: 1 },{ unique: true });


export const reviewModel = mongoose.models.Review || model("Review", reviewSchema);