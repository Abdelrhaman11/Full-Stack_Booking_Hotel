# ___


# Hotel Booking Platform

A full-stack hotel booking platform built with the MERN stack. Users can browse hotels, create bookings, leave reviews and ratings, and make secure payments using Stripe.

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

---

## Features

### Authentication & Users

* User registration and login
* JWT-based authentication
* Email verification
* Password validation
* Forgot password functionality
* User profile management
* Protected routes and authentication middleware
* Rate limiting to protect authentication endpoints from excessive requests

### Hotel Management

* Browse available hotels
* Search hotels by location, dates, and number of beds
* View hotel details
* Hotel owners can create, update, and delete their listings
* Hotel ownership authorization
* Image upload and management using Cloudinary
* Stripe Connect required before adding hotels
* Redis caching for hotel listing and hotel details
* Automatic Redis cache invalidation when hotels are created, updated, or deleted

### Hotel Reviews & Ratings

* Users can leave reviews for hotels
* Optional hotel rating from 1 to 5 stars
* Optional comments
* Users can submit a rating only, a comment only, or both
* Prevent users from reviewing the same hotel multiple times
* Display hotel reviews with reviewer information
* Calculate and display average hotel rating
* Display total number of hotel ratings
* Reviews are stored separately from the Hotel model

### Booking & Payments

* Hotel booking system
* Prevent double booking for overlapping dates
* Secure checkout using Stripe
* Stripe Checkout Sessions
* Stripe Connect for hotel owners
* Payment status tracking
* Stripe Webhooks for confirming and expiring bookings
* Idempotency handling to prevent duplicate payment sessions
* Protected booking endpoints

### Caching & Performance

* Redis integration for server-side caching
* Cache hotel listing results
* Cache individual hotel details
* Reduce unnecessary database queries
* Redis cache invalidation after hotel creation
* Redis cache invalidation after hotel updates
* Redis cache invalidation after hotel deletion

### Security

* JWT authentication
* Protected API routes
* Role/ownership authorization
* Request validation
* Rate limiting
* Password hashing using bcrypt
* Environment variables for sensitive credentials
* Stripe webhook verification
* Input validation using Joi and Zod

---

## Frontend

* React.js
* React Router
* React Hook Form
* Zod validation
* Bootstrap
* Ant Design
* Axios
* React Hot Toast
* Responsive UI
* Hotel details and booking interface
* Hotel reviews and ratings interface
* Loading states and error handling

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Joi validation
* Multer
* Cloudinary
* Redis
* Stripe API
* Stripe Checkout
* Stripe Connect
* Stripe Webhooks
* Express Rate Limit
* RESTful APIs
* Async error handling

---

## Database

The application uses **MongoDB** with Mongoose for data modeling.

Main entities include:

* Users
* Hotels
* Bookings
* Reviews

Reviews are stored in a separate collection and reference both the user and hotel.

---

## Caching Strategy

Redis is used to cache frequently requested hotel data.

For example:

* `hotels` → cached list of hotels
* `hotel:{hotelId}` → cached individual hotel details

The cache is invalidated whenever the related hotel data changes to prevent users from receiving outdated information.

---

## Payment Flow

The payment system is implemented using **Stripe Checkout** and **Stripe Connect**.

### Customer

1. User selects a hotel.
2. User creates a booking.
3. Backend creates a Stripe Checkout Session.
4. User completes payment through Stripe Checkout.
5. Stripe sends a webhook event to the backend.
6. The booking status is updated based on the payment event.

### Hotel Owner

1. Seller creates a Stripe Connect account.
2. Seller completes Stripe onboarding.
3. Seller can create hotel listings.
4. Payments from bookings can be transferred to the connected Stripe account.

---

## Project Architecture

The backend follows a modular structure separating:

* Routes
* Controllers
* Models
* Middleware
* Validation
* Utilities
* Authentication
* Payment logic
* Redis caching

This structure helps keep the application maintainable and scalable.

---

## Environment Variables

Sensitive configuration is stored using environment variables.

Example:

```env
PORT=
MONGO_URI=
TOKEN_KEY=

STRIPE_SECRET=
STRIPE_WEBHOOK_SECRET=

REDIS_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Never commit your `.env` file or secret keys to GitHub.**

---

## Author

**Abdelrahman Khaled Hamed**

Full Stack Developer | Node.js Developer | React.js | AWS

Built with the MERN Stack.
