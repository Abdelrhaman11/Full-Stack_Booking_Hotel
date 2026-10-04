import jwt  from "jsonwebtoken"
import { asyncHandler } from "../Utils/asyncHandler.js"
import { userModel } from "../../DB/Models/user.model.js"

export const isAuthenticated=asyncHandler(async(req,res,next)=>{
let token = req.headers["token"];

  if(!token || !token.startsWith(process.env.BEARER_KEY)) 
      return next(new Error("valid token is required" , {cause: 401}))

   token = token.split(" ")[1];

    const decoded = jwt.verify(token,process.env.TOKEN_KEY)
    if(!decoded) return next(new Error("Invalid token !"))

      const user = await userModel.findOne({email:decoded.email})
    if(!user) return next(new Error("User not found !"))

        req.user=user

        return next()

})