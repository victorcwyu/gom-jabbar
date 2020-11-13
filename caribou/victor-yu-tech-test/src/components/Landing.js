import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <h1>Welcome!</h1>
      <h2>New here?</h2>
      <Link to="/signup">Sign Up</Link>
      <h2>Been here before?</h2>
      <Link to="/login">Log In</Link>
    </>
  );
}
