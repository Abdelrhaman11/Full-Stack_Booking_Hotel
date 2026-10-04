import { userModel } from "../../../DB/Models/user.model.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import bcryptjs from "bcryptjs"
import crypto from 'crypto'
import { sendEmail } from "../../Utils/sendEmails.js";
import jwt from 'jsonwebtoken'
import Stripe from "stripe"

export const registerUser = asyncHandler(async(req,res,next)=>{

const {name , email, password , dateOfBirth , phone , gender } = req.body
    
    const isUser = await userModel.findOne({email})
    if(isUser){
        return next(new Error("Email already exists",{cause:409}))
    }

    const activationCode = crypto.randomBytes(64).toString('hex')

    const user = await userModel.create({name , email , password , dateOfBirth , phone , gender , activationCode})

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${activationCode}`

    const html=`
     <button class="border rounded-pill  " ><a href="${link}">Activate Email</a></button>
     `

     const isSent = await sendEmail({to:email , subject:"Confirm Email" , html})

     return isSent ? res.status(201).json({message:"User Created Successfully , Please Check Your Email To Activate Your Account"}) : next(new Error("Failed to send email",{cause:500}))

})


export const confirmEmail= asyncHandler(async(req,res,next)=>{

    const {activationCode} = req.params

    const user = await userModel.findOneAndUpdate({activationCode} , {isConfirmed:true , $unset:{activationCode:1}} , {new:true})

    if(!user){
        return next(new Error("User Not Found or Already Confirmed",{cause:404}))
    }

    return res.send("Congratulation, your account is now activated !, try to login Now")


})

export const login= asyncHandler(async(req,res,next)=>{
    const {email , password} = req.body

    const user = await userModel.findOne({email});

    if(!user){
        return next(new Error("Invalid Email",{cause:400}))
    }

    if(!user.isConfirmed){
        return next(new Error("Please Confirm Your Email First",{cause:400}))
    }

    const match = user.comparePassword(password)

    if(!match){
        return next(new Error("Invalid Password",{cause:400}))
    }

    const token = jwt.sign({id:user._id , email:user.email} , process.env.TOKEN_KEY, {expiresIn:"7d"})

    console.log(token);

    // await tokenModel.create({token , user:user._id , agent:req.headers["user-agent"] , expiredAt: new Date(Date.now() + 2*24*60*60*1000)})

    return res.status(200).json({message:"Login Successfully" , token , user:{name:user.name , email:user.email , _id:user._id}})

})


export const getProfileData = asyncHandler(async(req,res,next)=>{

    const userData = await userModel.findById({_id:req.user._id}).select("-password -activationCode -forgetCode");
    if(!userData)
        return next(new Error("Invalid User",{cause:404}))


    return res.status(200).json({message:"Successfully" , user:userData})
})




//    const user = await userModel.findById(req.user._id)
//    if(!user)
//         return next(new Error("Invalid User",{cause:404}))

//    if(!user.stripe_account_id){
//     const account = await stripe.accounts.create({
//         type:"express"
//     })

//     console.log("STRIPE ERROR >>>>>", error);

//     console.log("ACCOUNT>>>>>" , account);
    

//     user.stripe_account_id = account.id
//     await user.save();


//    }

//    return res.status(200).json({
//         message: "Stripe Connect account created successfully",
//         accountId: user.stripe_account_id
//     });
    
// })


// export const createConnectAccount = asyncHandler(async (req, res, next) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET);

//   const user = await userModel.findById(req.user._id);

//   if (!user) {
//     return next(new Error("Invalid User", { cause: 404 }));
//   }

//   // 1. Create Stripe Connect Account if user doesn't have one
//   if (!user.stripe_account_id) {
//     const account = await stripe.accounts.create({
//       type: "express",
//     });

//     console.log("ACCOUNT >>>>>", account);

//     user.stripe_account_id = account.id;

//     await user.save();
//   }

//   // 2. Create Stripe onboarding link
//   const accountLink = await stripe.accountLinks.create({
//     account: user.stripe_account_id,
//     refresh_url: process.env.STRIPE_REDIRECT_URL,
//     return_url: process.env.STRIPE_REDIRECT_URL,
//     type: "account_onboarding",
//   });

//   console.log("ACCOUNT LINK >>>>>", accountLink.url);

//   // 3. Return Stripe URL to frontend
//   return res.status(200).json({
//     link: accountLink.url,
//   });
// });