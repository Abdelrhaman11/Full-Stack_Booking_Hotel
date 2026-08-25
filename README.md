# ___


# Hotel Booking Platform

A full-stack hotel booking platform built with the MERN stack. Users can browse hotels, create bookings, and make secure payments using Stripe.

Hotel owners can create and manage their hotel listings. **Before adding a hotel, the user must complete the Stripe Connect account setup to enable payouts and receive payments from bookings.**

## Important — Hotel Owner Setup

To add a hotel, you must first complete the Stripe Connect setup:

1. Create an account on the platform.
2. Go to the seller dashboard.
3. Click the **`SetUp payouts`** button.
4. Complete the Stripe Connect onboarding process.
5. After the Stripe account is successfully connected, the **`+ Add New`** button will become available.
6. You can then create and manage your hotel listings.

The platform uses **Stripe Checkout** for customer payments and **Stripe Connect** to transfer hotel owners' earnings to their connected Stripe accounts.


////////////////////   Features    //////////////////

Authentication & Users
User registration and login
JWT-based authentication
Email verification
Password validation
Forgot password functionality
User profile management


//////////////  Hotel Management  /////////////


Browse available hotels
Search hotels by location, dates, and number of beds
View hotel details
Hotel owners can create, update, and delete their listings
Image upload and management using Cloudinary
Stripe Connect required before adding hotels


//////////////  Booking & Payments  /////////////



Hotel booking system
Prevent double booking for overlapping dates
Secure checkout using Stripe
Stripe Checkout Sessions
Stripe Connect for hotel owners
Payment status tracking
Stripe Webhooks for confirming and expiring bookings
Idempotency handling to prevent duplicate payment sessions


///////////////////  Frontend  ///////////////////


React.js
React Router
React Hook Form
Zod validation
Bootstrap
Ant Design
Responsive UI


////////////////  Backend  ///////////////////


Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Joi validation
Multer
Cloudinary
Stripe API
RESTful APIs



//////////////  Author  ////////////////

Abdelrahman Khaled Hamed

Full Stack Developer | Node.js Developer | React.js | AWS

Built with the MERN Stack.