import { Router } from "express"
import { isAuthenticated } from "../../Middleware/authentication.middleware.js"
import { isValid } from "../../Middleware/validation.middleware.js"
import { createHotel, hotels, sellerHotels, deleteHotels, getHotel, updateHotel , userHotelBooking , isAlreadyBooked , searchListings} from "./hotel.controller.js"
import { createHotelSchema, updateHotelSchema } from "./hotel.validation.js"
import { fileUpload, filterObject } from "../../Utils/multer.js"
import { hotelModel } from "../../../DB/Models/hotel.model.js"


const router = Router()


router.post("/createHotel" , isAuthenticated , fileUpload(filterObject.image).single("image") ,isValid(createHotelSchema , ["body"]) , createHotel)
router.get("/hotels" , hotels)
router.get("/seller_hotels" , isAuthenticated , sellerHotels)
router.delete("/delete_hotel/:hotelId" , isAuthenticated , deleteHotels)
router.patch("/update_hotel/:hotelId" , isAuthenticated , fileUpload(filterObject.image).single("image") , isValid(updateHotelSchema, ["body"]) , updateHotel)
router.get("/user-hotel-booking" , isAuthenticated , userHotelBooking)
router.get("/:hotelId" , getHotel)
router.get("/is-already-booked/:hotelId", isAuthenticated , isAlreadyBooked)
router.post("/search-listings", searchListings)





export default router