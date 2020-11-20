import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.scss";

export default function Landing() {
  return (
    <div className="pageContainer">
      <div className="wrapper">
        <h1>Welcome to the Inter-Human-Caribou Harmony (IHCH) Application!</h1>
        <div className="landingLinks">
          <div className="link">
            <h2>New here?</h2>
            <Link to="/signup">Sign Up</Link>
          </div>
          <div className="link">
            <h2>Have an account?</h2>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
      <footer>
        <div className="footerWrapper">
          <p>© {new Date().getFullYear()}, Built by Victor Yu</p>
          <a href="https://unsplash.com/photos/o78epm7JJCI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink">
            Photo by Arseny Togulev on Unsplash
          </a>
        </div>
      </footer>
    </div>
  );
}
