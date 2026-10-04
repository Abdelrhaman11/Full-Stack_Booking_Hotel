import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { signUpSchema } from '../validation/schema.js';
import { useNavigate } from 'react-router-dom';
import {apiServices} from "../services/api.js"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { EyeFilledIcon } from "../Components/password/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../Components/password/EyeSlashFilledIcon.jsx";

export default function Register() {



    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);


    const {handleSubmit , register , formState:{errors}} = useForm({
        resolver:zodResolver(signUpSchema),
    })

  async function signUp(registerDate){


      setIsLoading(true);

    try {
      const response = await apiServices.signup(registerDate)
      console.log(response)

      toast.success(response.message);

      setTimeout(() => {
          navigate("/login");
        }, 3000);



    } catch (error) {
       console.log(error.response?.data?.message);
        if(error.response){
        toast.error(error.response.data.message);
      }
      else{
            toast.error("An error occurred. Please try again later.");
      }
    } finally {
              setIsLoading(false);
         }

  }

  


return (
  <div className="min-vh-100 d-flex align-items-center justify-content-center py-5"
    style={{
      background: "linear-gradient(135deg, #f4f7fb 0%, #eef4ff 100%)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">

        <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">

          <div className="bg-white shadow-lg"
            style={{
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >

            {/* Header */}
            <div className="text-white text-center py-4"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #4f8dfd)",
              }}
            >
              <h2 className="fw-bold mb-1">Create Your Account</h2>

              <p className="mb-0 opacity-75">Join us and start your journey</p>
            </div>

            {/* Form */}
            <div className="p-4 p-md-5">

              <form onSubmit={handleSubmit(signUp)}>

                {/* Name */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">Name</label>

                  <input {...register("name")} type="text" placeholder="Enter your name" className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""}`}
                    style={{
                      borderRadius: "12px",
                      padding: "12px 15px",
                      fontSize: "15px",
                    }}
                  />

                  {errors.name && (
                    <div className="text-danger small mt-1"> {errors.name.message} </div>
                    )}

                </div>

                {/* Email */}
                <div className="mb-3">

                  <label className="form-label fw-semibold"> Email Address</label>

                  <input {...register("email")} type="email" placeholder="Enter your email" className={`form-control form-control-lg ${ errors.email ? "is-invalid" : "" }`}
                    style={{
                      borderRadius: "12px",
                      padding: "12px 15px",
                      fontSize: "15px",
                    }}
                  />

                  {errors.email && (
                    <div className="text-danger small mt-1">{errors.email.message}</div>
                  )}

                </div>

                {/* Password */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">Password</label>

                  <div className="position-relative">

                    <input {...register("password")} type={isPasswordVisible ? "text" : "password"} placeholder="Create a password" className={`form-control form-control-lg pe-5 ${ errors.password ? "is-invalid" : "" }`}
                      style={{
                        borderRadius: "12px",
                        padding: "12px 50px 12px 15px",
                        fontSize: "15px",
                      }}
                    />

                    <button type="button" onClick={() =>setIsPasswordVisible(!isPasswordVisible)}className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent p-2"
                      style={{
                        cursor: "pointer",
                        color: "#6c757d",
                      }}aria-label="Toggle password visibility">
                      {isPasswordVisible ? (
                        <EyeSlashFilledIcon
                          style={{
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      ) : (
                        <EyeFilledIcon
                          style={{
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      )}
                    </button>

                  </div>

                  {errors.password && (
                    <div className="text-danger small mt-1"> {errors.password.message}</div>
                  )}

                </div>

                {/* Confirm Password */}
                <div className="mb-3">

                  <label className="form-label fw-semibold">Confirm Password</label>

                  <div className="position-relative">

                    <input {...register("confirmPassword")}type={isConfirmPasswordVisible? "text" : "password"}placeholder="Confirm your password"className={`form-control form-control-lg pe-5 ${errors.confirmPassword ? "is-invalid" : ""}`}
                      style={{
                        borderRadius: "12px",
                        padding: "12px 50px 12px 15px",
                        fontSize: "15px",
                      }}
                    />

                    <button type="button" onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent p-2"
                      style={{
                        cursor: "pointer",
                        color: "#6c757d",
                      }}aria-label="Toggle confirm password visibility">
                      {isConfirmPasswordVisible ? (
                        <EyeSlashFilledIcon
                          style={{
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      ) : (
                        <EyeFilledIcon
                          style={{
                            width: "21px",
                            height: "21px",
                          }}
                        />
                      )}
                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <div className="text-danger small mt-1">{errors.confirmPassword.message}</div>
                  )}

                </div>

                {/* Phone */}
                <div className="mb-3">

                  <label className="form-label fw-semibold"> Phone </label>

                  <input {...register("phone")} type="text" placeholder="Enter your phone number"className={`form-control form-control-lg ${errors.phone ? "is-invalid" : ""}`}
                    style={{
                      borderRadius: "12px",
                      padding: "12px 15px",
                      fontSize: "15px",
                    }}
                  />

                  {errors.phone && (
                    <div className="text-danger small mt-1">{errors.phone.message}</div>
                  )}

                </div>

                {/* Birth Date */}
                <div className="mb-3">

                  <label className="form-label fw-semibold"> Birth Date </label>

                  <input {...register("dateOfBirth")} type="date" className={`form-control form-control-lg ${ errors.dateOfBirth ? "is-invalid" : ""}`}
                    style={{
                      borderRadius: "12px",
                      padding: "12px 15px",
                      fontSize: "15px",
                    }}
                  />

                  {errors.dateOfBirth && (
                    <div className="text-danger small mt-1"> {errors.dateOfBirth.message} </div>
                  )}

                </div>

                {/* Gender */}
                <div className="mb-4">

                  <label className="form-label fw-semibold"> Gender </label>

                  <select {...register("gender")} className={`form-select form-select-lg ${ errors.gender ? "is-invalid" : ""}`}
                    style={{
                      borderRadius: "12px",
                      fontSize: "15px",
                    }}>
                    <option value=""> Select Gender </option>
                    <option value="male"> Male</option>
                    <option value="female">Female</option>
                  </select>

                  {errors.gender && (
                    <div className="text-danger small mt-1">{errors.gender.message}</div>
                  )}

                </div>

                {/* Register Button */}
                <button type="submit" disabled={isLoading} className="btn w-100 text-white fw-semibold"
                  style={{
                    padding: "13px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #0d6efd, #4f8dfd)",
                    border: "none",
                    fontSize: "16px",
                  }}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Registering...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center my-4">

                  <div className="flex-grow-1 border-top"></div>

                  <span className="px-3 text-muted small"> OR </span>

                  <div className="flex-grow-1 border-top"></div>

                </div>

                {/* Login */}
                <div className="text-center">

                  <span className="text-muted"> Already have an account? </span>

                  <Link to="/login" className="fw-semibold text-decoration-none ms-1"
                    style={{
                      color: "#0d6efd",
                    }}>
                      Login

                  </Link>

                </div>

              </form>

            </div>
          </div>

          <p className="text-center text-muted small mt-3"> Your information is secure and protected </p>

        </div>
      </div>
    </div>
  </div>
);


}
