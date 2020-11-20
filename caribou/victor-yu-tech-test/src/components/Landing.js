import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles/Landing.scss";

export default function Landing() {
  return (
    <>
      <div className="wrapper">
        <h1>Welcome to the Inter-Human-Caribou Harmony (IHCH) Application!</h1>
        <div className="landingLinks">
          <Link to="/signup">New here?</Link>
          <Link to="/login">Have an account?</Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
