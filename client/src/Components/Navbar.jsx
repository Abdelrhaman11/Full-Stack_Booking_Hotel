import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext";

export default function Navbar() {

  const {userToken , setUserData , setUserToken , userData} = useContext(authContext)

  function logOut(){
     localStorage.removeItem("token");
    setUserToken(null)
    setUserData(null)

  }

  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Hotel
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>

            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>



    {userToken && (
            <div className="dropdown">

              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || "User")}`}
                  alt="avatar"
                  width="35"
                  height="35"
                  className="rounded-circle"
                />

                <span>{userData?.name}</span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">

                <li className="px-3 py-2">
                  <strong>{userData?.name}</strong>
                  <br />
                  <Link className="text-decoration-none text-dark fw-semibold" to="/viewProfile">{userData?.email}</Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <button
                    onClick={logOut}
                    className="dropdown-item text-danger"
                  >
                    Log Out
                  </button>
                </li>

              </ul>


            </div>
          )}



        </div>
      </div>
    </nav>
  );
}