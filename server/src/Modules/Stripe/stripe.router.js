import { Router } from "express"
import { isAuthenticated } from "../../Middleware/authentication.middleware.js"
import { createConnectAccount, getAccountStatus , getAccountBalance , payoutSetting , stripeSession , stripeWebhook } from "./stripe.controller.js"
import express from "express";

const router = Router()


router.post("/create-connect-account", isAuthenticated , createConnectAccount)
router.post("/get-account-status", isAuthenticated , getAccountStatus)
router.post("/get-account-balance", isAuthenticated , getAccountBalance)
router.post("/payout-setting", isAuthenticated , payoutSetting)
router.post("/stripe-session-id", isAuthenticated , stripeSession)
router.post("/webhook",express.raw({ type: "application/json" }),stripeWebhook);







export default router