import React from "react";
import Footer from "./Footer";
import "../styles/Landing.scss";
import Header from "./Header";

export default function Landing() {
  return (
    <>
      <Header />
      <div className="landingWrapper">
        <h1>Welcome to the Inter-Human-Caribou Harmony (IHCH) Application!</h1>
      </div>
      <Footer />
    </>
  );
}
