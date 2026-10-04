import React from 'react'
import { Link } from 'react-router-dom'

export default function StripeCancel() {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

      <div className="card shadow-sm text-center p-5" style={{ maxWidth: "500px", width: "100%" }}>

        <div className="rounded-circle bg-danger text-white d-flex justify-content-center align-items-center mx-auto mb-4"
        style={{
            width: "80px",
            height: "80px",
            fontSize: "40px"
          }}
        >
          ✕
        </div>

        <h2 className="text-danger mb-3"> Payment Failed </h2>

        <p className="text-muted mb-4"> Your payment was not completed. Please try again or use a different payment method.</p>

        <div className="d-flex justify-content-center gap-2">

          <Link to="/" className="btn btn-danger" > Try Again </Link>

          <Link to="/" className="btn btn-outline-secondary"> Back to Home </Link>

        </div>

      </div>
    </div>
  )
}