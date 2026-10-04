import React from "react";

export default function LoadingScreen() {
  return (
    <div
      className="d-flex justify-content-center" style={{ paddingTop: "100px" }}>
      <div className="spinner-border text-primary" role="status"style={{ width: "3rem", height: "3rem" }}></div>
    </div>
  );
}