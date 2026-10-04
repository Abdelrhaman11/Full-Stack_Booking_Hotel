import morgan from "morgan";
import cors from "cors"
import authRouter from "./Modules/user/user.router.js";
import stripeRouter from "./Modules/Stripe/stripe.router.js";
import hotelRouter from "./Modules/Hotel/hotel.router.js";
import reviewRouter from "./Modules/Review/review.router.js";
import { globleErrorHandling } from "./Utils/asyncHandler.js";



export const appRouter = (app,express) => {

   if (process.env.NODE_ENV === "development") {
       app.use(morgan("dev"));
    }

    app.use(cors())



    // app.use(express.json());
      app.use((req,res,next)=>{
      if(req.originalUrl == "/stripe/webhook")
      {
        return next();
      }
      express.json()(req,res,next)
    });

    app.use("/auth", authRouter);
    app.use("/stripe", stripeRouter);
    app.use("/hotel", hotelRouter);
    app.use("/review", reviewRouter);

    app.use((req,res,next)=>{
        res.status(404).json({message:"Route not found"})
    })

    app.use(globleErrorHandling)


  };