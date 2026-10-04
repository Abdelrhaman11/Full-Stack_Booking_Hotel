
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { apiServices } from "../services/api.js";
import toast from "react-hot-toast";
import { loginSchema } from "../validation/schema.js";
import { authContext } from "../context/authContext.jsx";
import { EyeFilledIcon } from "../Components/password/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "../Components/password/EyeSlashFilledIcon.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { setUserToken } = useContext(authContext);

  
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function login(loginDate) {
    setIsLoading(true);

    try {
      const response = await apiServices.login(loginDate);

      localStorage.setItem("token", response.token);
      apiServices.setToken(response.token);
      setUserToken(response.token);

      toast.success(response.message);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error(
        error.response?.data?.validationError ||
          error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }


return (
  <div
    className="min-vh-100 d-flex align-items-center justify-content-center py-5"
    style={{
      background: "linear-gradient(135deg, #f4f7fb 0%, #eef4ff 100%)",
    }}
  >
    <div className="container">
      <div className="row justify-content-center">

        <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">

          <div
            className="bg-white shadow-lg"
            style={{
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >

            {/* Top Header */}
            <div
              className="text-white text-center py-4"
              style={{
                background: "linear-gradient(135deg, #0d6efd, #4f8dfd)",
              }}
            >
              <h2 className="fw-bold mb-1">
                Welcome Back
              </h2>

              <p className="mb-0 opacity-75">
                Login to continue to your account
              </p>
            </div>

            {/* Form */}
            <div className="p-4 p-md-5">

              <form onSubmit={handleSubmit(login)}>

                {/* Email */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                    className={`form-control form-control-lg ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    style={{
                      borderRadius: "12px",
                      padding: "13px 15px",
                      fontSize: "15px",
                    }}
                  />

                  {errors.email && (
                    <div className="text-danger small mt-1">
                      {errors.email.message}
                    </div>
                  )}

                </div>

                {/* Password */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <div className="position-relative">

                    <input
                      {...register("password")}
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`form-control form-control-lg pe-5 ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      style={{
                        borderRadius: "12px",
                        padding: "13px 50px 13px 15px",
                        fontSize: "15px",
                      }}
                    />

                    {/* Password Visibility */}
                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent p-2"
                      style={{
                        cursor: "pointer",
                        color: "#6c757d",
                      }}
                      aria-label="Toggle password visibility"
                    >
                      {isVisible ? (
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
                    <div className="text-danger small mt-1">
                      {errors.password.message}
                    </div>
                  )}

                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn w-100 text-white fw-semibold"
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
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Divider */}
                <div className="d-flex align-items-center my-4">

                  <div className="flex-grow-1 border-top"></div>

                  <span className="px-3 text-muted small">
                    OR
                  </span>

                  <div className="flex-grow-1 border-top"></div>

                </div>

                {/* Register */}
                <div className="text-center">

                  <span className="text-muted">
                    Don't have an account?
                  </span>

                  <Link
                    to="/register"
                    className="fw-semibold text-decoration-none ms-1"
                    style={{
                      color: "#0d6efd",
                    }}
                  >
                    Create an account
                  </Link>

                </div>

              </form>

            </div>
          </div>

          <p className="text-center text-muted small mt-3">
            Secure login · Your information is protected
          </p>

        </div>
      </div>
    </div>
  </div>
);




}

