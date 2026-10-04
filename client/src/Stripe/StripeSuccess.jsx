import React from 'react'
import { Link } from 'react-router-dom'


export default function StripeSuccess() {
    
  return (
      <>

   <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

      <div className="card shadow-sm text-center p-5" style={{ maxWidth: "500px", width: "100%" }}>

        <div
          className="rounded-circle bg-success text-white d-flex justify-content-center align-items-center mx-auto mb-4"
          style={{ width: "80px", height: "80px", fontSize: "40px" }}
        >
          ✓
        </div>

        <h2 className="text-success mb-3">
          Payment Successful!
        </h2>

        <p className="text-muted mb-4">
          Your payment has been completed successfully.
          Your booking is being confirmed.
        </p>

        <div className="d-flex justify-content-center gap-2">

          <Link
            to="/dashboard"
            className="btn btn-success"
          >
            View My Bookings
          </Link>

          <Link
            to="/"
            className="btn btn-outline-secondary"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </div>


    </>
  )
}
