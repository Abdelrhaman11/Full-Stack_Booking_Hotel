import mongoose, { model, Schema, Types } from "mongoose";



const bookingSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    hotel: {
      type: Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    fromDate: {
      type: Date,
      required: true
        },

    toDate: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed" , "expired", "cancelled", "failed"],
      default: "pending",
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const bookingModel = mongoose.models.Booking || model('Booking' , bookingSchema)