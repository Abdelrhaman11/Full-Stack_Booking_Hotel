import mongoose, { model, Schema, Types } from "mongoose";


const hotelSchema = new Schema({

   image: {
        url: {type: String , required: true},
        id:{type:String , required : true}
    },
    title: {type: String , required: true , minlength: 3 , maxlength: 100, trim: true},

    content: {type: String,required: true , minlength: 10 , maxlength: 1000 , trim: true},

    location: {type: String , required: true , trim: true},

    price: {type: Number , required: true , min: 0},

    bed: {type: Number , required: true , min: 1},

    fromDate: {type: Date , required: true},

    toDate: {type: Date , required: true},   

    postedBy:{type: Types.ObjectId , ref:"User"},


},{timestamps:true})

export const hotelModel = mongoose.models.Hotel || model('Hotel' , hotelSchema)