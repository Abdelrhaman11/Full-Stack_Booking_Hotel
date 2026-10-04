import React from 'react'
import { useContext } from 'react'
import { authContext } from '../context/authContext'
import { Link } from 'react-router-dom';

export default function ViewProfile() {
      const {userData} = useContext(authContext)
    
  return (
    <>
      {/* Header */}
      <div className="container-fluid bg-light border-bottom py-5">
        <div className="container text-center">
          <div className="mb-3">
            <i className="bi bi-person-circle display-1 text-primary"></i>
          </div>

          <h2 className="fw-bold mb-1">{userData?.name}</h2>

          <p className="text-muted mb-0">
            {userData?.email}
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0 fw-bold"> Personal Information</h4>

                  <Link to="/" className="btn btn-outline-secondary btn-sm">
                    <i className="bi bi-arrow-left me-1"></i> Back </Link>
                </div>

                <hr />

                <div className="row mt-4">

                  {/* Name */}
                  <div className="col-md-6 mb-4">
                    <p className="text-muted small mb-1"> Full Name </p>

                    <p className="fw-semibold mb-0">
                      <i className="bi bi-person me-2 text-primary"></i>
                      {userData?.name || "Not available"}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-4">
                    <p className="text-muted small mb-1">Email Address</p>

                    <p className="fw-semibold mb-0">
                      <i className="bi bi-envelope me-2 text-primary"></i>
                      {userData?.email || "Not available"}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="col-md-6 mb-4">
                    <p className="text-muted small mb-1"> Phone Number </p>

                    <p className="fw-semibold mb-0">
                      <i className="bi bi-telephone me-2 text-primary"></i>
                      {userData?.phone || "Not available"}
                    </p>
                  </div>

                  {/* Gender */}
                  <div className="col-md-6 mb-4">
                    <p className="text-muted small mb-1"> Gender </p>

                    <p className="fw-semibold text-capitalize mb-0">
                      <i className="bi bi-gender-ambiguous me-2 text-primary"></i>
                      {userData?.gender || "Not available"}
                    </p>
                  </div>

                  {/* Date of Birth */}
                  <div className="col-md-6 mb-4">
                    <p className="text-muted small mb-1"> Date of Birth</p>

                    <p className="fw-semibold mb-0">
                      <i className="bi bi-calendar me-2 text-primary"></i>

                      {userData?.dateOfBirth
                        ? new Date(
                            userData.dateOfBirth
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Not available"}
                    </p>
                  </div>

                  {/* Account Status */}
                  <div className="col-md-6 mb-4">
                    <p className="text-muted small mb-1"> Account Status </p>

                    <span className={`badge ${userData?.isConfirmed? "text-bg-success" : "text-bg-warning"
                      }`} >
                      {userData?.isConfirmed ? "Verified" : "Not Verified"}
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}



