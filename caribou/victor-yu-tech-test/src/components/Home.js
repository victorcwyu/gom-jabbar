import React from "react";
import Contacts from "./Contacts";
import ReportsMap from "./ReportsMap";
import "../styles/Home.scss";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="homeWrapper">
        <div className="contactsAndMapContainer">
          <Contacts />
          <ReportsMap />
        </div>
      </div>
      <Footer />
    </>
  );
}
