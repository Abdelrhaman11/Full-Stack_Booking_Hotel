import { bookingModel } from "../../../DB/Models/booking.model.js";
import { hotelModel } from "../../../DB/Models/hotel.model.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import cloudinary from "../../Utils/cloudianry.js";
import redisClient from "../../../DB/redis.js";

export const createHotel=asyncHandler(async(req,res,next)=>{

  const {title , content , price , bed , location , fromDate , toDate} = req.body

  if(!req.file) return next(new Error("Hotel imgae is required" , {cause:400}))

    const {public_id,secure_url} = await cloudinary.uploader.upload(
      req.file.path,
      {folder:`${process.env.FOLDER_CLOUD_NAME}/hotel`}
    )



    const addHotel = await hotelModel.create({
      image:{id:public_id , url:secure_url},
      title,
      content,
      price,
      bed,
      location,
      fromDate,
      toDate,
      postedBy:req.user._id
    })

   await redisClient.del("hotels");

   return res.status(201).json({success:true ,  message : "Hotel Create" , results:addHotel})
    

})

export const hotels = asyncHandler(async(req,res,next)=>{

    const cacheKey = "hotels";

    const cachedHotels = await redisClient.get(cacheKey);

    if (cachedHotels) {


    return res.status(200).json({
      success: true,
      results: JSON.parse(cachedHotels),
    });
  }


  const allHotel = await hotelModel.find().limit(24).populate({
  // const allHotel = await hotelModel.find({fromDate:{$gte:new Date()}}).limit(24).populate({
    path:"postedBy",
    select:"_id name"
  })
  

   if(!allHotel){
    return next(new Error("allHotel not found !" , {cause:404}))
  }

    await redisClient.set( cacheKey,JSON.stringify(allHotel),
    {
      EX: 60 * 5, // 5 minutes
    }

  );
  
     return res.status(201).json({success:true , results:allHotel})

})

export const sellerHotels = asyncHandler(async(req,res,next)=>{

  const allSeller = await hotelModel.find({postedBy:req.user._id}).populate({
    path:"postedBy",
    select:"_id name"
  })

  if(!allSeller){
    return next(new Error("allSeller not found !" , {cause:404}))
  }

  return res.status(201).json({success:true , results:allSeller})

})

export const deleteHotels = asyncHandler(async(req,res,next)=>{
  const {hotelId} = req.params

const hotel = await hotelModel.findById(hotelId)
  if(!hotel) return next(new Error("Hotel not found !" , {cause:404}))

  if(req.user._id.toString() !== hotel.postedBy.toString())
 return next(new Error("You aren't authorized !"))

  const result = await cloudinary.uploader.destroy(hotel.image.id);

  await hotelModel.findByIdAndDelete(hotelId)

  await redisClient.del("hotels");
  await redisClient.del(`hotel:${hotelId}`);

  return res.json({success:true , message : "Hotel deleted" })

     
})

export const updateHotel = asyncHandler(async(req,res,next)=>{
  const {hotelId} = req.params

const hotel = await hotelModel.findById(hotelId)
  if(!hotel) return next(new Error("Hotel not found !" , {cause:404}))

  if(req.user._id.toString() !== hotel.postedBy.toString())
 return next(new Error("You aren't authorized !"))

 hotel.title =  req.body.title ? req.body.title : hotel.title
 hotel.content =  req.body.content ? req.body.content : hotel.content
 hotel.location =  req.body.location ? req.body.location : hotel.location
 hotel.price =  req.body.price ? req.body.price : hotel.price
 hotel.bed =  req.body.bed ? req.body.bed : hotel.bed
 hotel.fromDate =  req.body.fromDate ? req.body.fromDate : hotel.fromDate
 hotel.toDate =  req.body.toDate ? req.body.toDate : hotel.toDate

 if(req.file){
  const {public_id , secure_url} = await cloudinary.uploader.upload(req.file.path,{
    public_id : hotel.image.id,
  })
  hotel.image.url = secure_url
 }

  await hotel.save()


  await redisClient.del("hotels");
  await redisClient.del(`hotel:${hotelId}`);


  return res.json({success:true , message : "Hotel updated" , result:hotel })

     
})



export const getHotel = asyncHandler(async(req,res,next)=>{

    const { hotelId } = req.params;

    const cacheKey = `hotel:${hotelId}`;
    const cachedHotel = await redisClient.get(cacheKey);

    if (cachedHotel) {


    return res.status(200).json({success: true,results: JSON.parse(cachedHotel),});
  }


  const Hotel = await hotelModel.findById(hotelId).populate({
    path:"postedBy",
    select:"_id name"
  })

  if(!Hotel){
    return next(new Error("Hotel not found !" , {cause:404}))
  }

    await redisClient.set(cacheKey , JSON.stringify(Hotel),
    {
      EX: 60 * 5,
    }
  );

  return res.status(201).json({success:true , results:Hotel})

})



export const userHotelBooking = asyncHandler(async(req,res,next)=>{

  const bookings  = await bookingModel.find({user:req.user._id}).populate([
      {
        path: "user",
        select: "_id name stripeSession",
      },
      {
        path: "hotel",
        populate: {
          path: "postedBy",
          select: "name email stripe_account_id",
        },
      },
    ])

  if(!bookings.length) return next(new Error("bookings not found !" , {cause:404}))

  const validBookings = bookings.filter(
    (booking) => booking.hotel !== null
  );

  res.status(200).json({result:validBookings , success:true})



})

export const isAlreadyBooked = asyncHandler(async(req,res,next)=>{

  const { hotelId } = req.params

  const userOrders = await bookingModel.find({user:req.user._id}).select("hotel")

  if(!userOrders.length){
    return next(new Error("Orders not found !" , {cause:404}))
  }


  let ids=[];

  for(let i =0 ; i < userOrders.length ; i++){
    ids.push(userOrders[i].hotel.toString())
  }

  const result = ids.includes(hotelId)
  

  return res.json({result})


})


export const searchListings = asyncHandler(async(req,res,next)=>{

  const {location , date , bed} = req.body

  const splitDate = date.split(",")


  let result = await hotelModel.find({fromDate:{$gte: new Date(splitDate[0])} , location , bed})

  if(!result.length){
    return next(new Error("No hotels found!" , {cause:404}))
  }

  res.status(200).json({result})


})
