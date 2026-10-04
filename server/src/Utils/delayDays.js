import Stripe from "stripe"


export const  updateDelayDays = async(accountid)=>{
const stripe = new Stripe(process.env.STRIPE_SECRET);

  const account = await stripe.accounts.update(accountid,{
    settings:{
      payouts:{
        schedule:{
          delay_days:7,
        }
      }
    }
  })

    return account;
}