import Stripe from "stripe"
import { userModel } from "../../../DB/Models/user.model.js";
import { asyncHandler } from "../../Utils/asyncHandler.js";
import { updateDelayDays } from "../../Utils/delayDays.js";
import { hotelModel } from "../../../DB/Models/hotel.model.js";
import { bookingModel } from "../../../DB/Models/booking.model.js";


export const createConnectAccount = asyncHandler(async (req, res, next) => {


const stripe = new Stripe(process.env.STRIPE_SECRET);


  const user = await userModel.findById(req.user._id);

  if (!user) {
    return next(new Error("Invalid User", { cause: 404 }));
  }

  // 1. Create Stripe Connect Account if user doesn't have one
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: "express",
    });



    user.stripe_account_id = account.id;

    await user.save();
  }

  // 2. Create Stripe onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });



  // 3. Return Stripe URL to frontend
  return res.status(200).json({
    link: accountLink.url,
  });
});



export const getAccountStatus = asyncHandler(async (req,res,next)=>{
const stripe = new Stripe(process.env.STRIPE_SECRET);

  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new Error("Invalid User", { cause: 404 }));
   }
   const account = await stripe.accounts.retrieve(user.stripe_account_id)

   const updatedAccount = await updateDelayDays(account.id)
//    console.log("USER ACCOUNT RETRIEVE" , account);

const updateUser = await userModel.findByIdAndUpdate(user._id,{
    stripe_seller:updatedAccount,
},{new:true}).select("-password")

   return res.status(200).json({
    updateUser
  });
  

})





export const getAccountBalance = asyncHandler(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  const user = await userModel.findById(req.user._id);

  if (!user) {
    return next(new Error("Invalid User", { cause: 404 }));
  }

  const balance = await stripe.balance.retrieve(
    {},
    {
      stripeAccount: user.stripe_account_id,
    }
  );


  return res.status(200).json({
    balance,
  });


});


export const payoutSetting = asyncHandler(async(req,res,next)=>{
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(new Error("Invalid User", { cause: 404 }));
  }

  const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id,{
    redirect_url : process.env.STRIPE_SETTING_REDIRECT_URL
  })


  return res.status(200).json({
    loginLink,
  });

})

export const stripeSession = asyncHandler(async(req,res,next)=>{

  const stripe = new Stripe(process.env.STRIPE_SECRET);

  const {hotelId} = req.body
  const hotel = await hotelModel.findById(req.body.hotelId).populate("postedBy")
   if (!hotel) {
    return next(new Error("Hotel not found", { cause: 404 }));
  }


    let booking = await bookingModel.findOne({
    user: req.user._id,
    hotel: hotelId,
    status: "pending",
  });

  

    if (booking?.stripeSessionId) {

    const existingSession = await stripe.checkout.sessions.retrieve(
        booking.stripeSessionId
      );

      if (existingSession.status === "open") {
      return res.json({ success: true, url: existingSession.url});
    }

  }
  
  const existingBooking = await bookingModel.findOne({
    hotel: hotelId,

    status: {
      $in: ["pending", "confirmed"]
    },

    fromDate: {
      $lt: hotel.toDate
    },

    toDate: {
      $gt: hotel.fromDate
    }
  });


    if (existingBooking) {

    return next(new Error("This hotel is already booked for these dates",{ cause: 409 }));
  }




if (!booking) {
  booking = await bookingModel.create({
    user: req.user._id,
    hotel: hotelId,
    amount: hotel.price,
    status: "pending",
    fromDate: hotel.fromDate,
    toDate: hotel.toDate,
  });
}


  const fee = (hotel.price * 20)/100


  
let session;

const expiresAt = Math.floor(Date.now() / 1000) + 30 * 60;
  console.log(
    "Checkout expires in:",
    (expiresAt - Math.floor(Date.now() / 1000)) / 60,
    "minutes"
  );


try {
        session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        expires_at: expiresAt,
        customer_creation: "always",

        metadata: {
            bookingId: booking._id.toString(),
            hotelId: hotelId.toString()
        },

        success_url: `${process.env.SUCCESS_URL}/${hotel._id}`,
        cancel_url: process.env.CANCEL_URL,

        line_items: [
            {
                price_data: {
                    currency: "usd",

                    product_data: {
                        name: hotel.title,
                    },

                    unit_amount: Math.round(hotel.price * 100),
                },

                quantity: 1,
            },
        ],

        payment_intent_data: {
            application_fee_amount: fee,

            transfer_data: {
                destination: hotel.postedBy.stripe_account_id,
            }
        }

    }, {
        idempotencyKey: `booking_${booking._id}`,
    });

} catch (error) {

  console.error(
      "Stripe Checkout Error:",
      error.message
    );


    if (
        error.message?.includes(
            "Keys for idempotent requests can only be used"
        )
    ) {
        return next(
            new Error(
                "Your booking request is already being processed. Please wait a moment.",
                { cause: 409 }
            )
        );
    }

    return next(error);
}




    await bookingModel.findByIdAndUpdate(booking._id , {stripeSessionId:session.id})

    await userModel.findByIdAndUpdate(req.user._id,{$push: { stripeSession: { bookingId: booking._id,session: session}}});



    return res.json({success:true , url:session.url})
  

})


export const stripeWebhook = asyncHandler(async (req, res, next) => {
        console.log(`veaveavfavavdsojcdspoavjiodsviosbviusbvuibsauvbasiu`);


  const stripe = new Stripe(process.env.STRIPE_SECRET);

  const sig = req.headers["stripe-signature"];

  let event;

  try {

    event = stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET);

  } catch (error) {

    console.error("Webhook signature verification failed:", error.message);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }


  switch (event.type) {

    case "checkout.session.completed": {

      const session = event.data.object;

      const bookingId = session.metadata.bookingId;


      const booking = await bookingModel.findById(bookingId);


      if (!booking)
      {
        return res.json({success: false,message: "Booking not found"});
      }
      if (booking.status !== "pending") {
            break;
        }

      booking.status = "confirmed";

      await booking.save();

      break;
    }

    case "checkout.session.expired": {

        const session = event.data.object;

        const bookingId = session.metadata.bookingId;

        const booking = await bookingModel.findOne({
            _id: bookingId,
            status: "pending"
        });

        if (!booking) {
              return res.json({success: false,message: "Booking not found"});

        }

        booking.status = "expired";

        await booking.save();

        break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }


  return res.json({ received: true });
});


