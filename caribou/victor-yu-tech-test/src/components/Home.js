import React from "react";
import Contacts from "./Contacts";
import ContactSearch from "./ContactSearch";
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
          <ContactSearch />
          <ReportsMap />
        </div>
      </div>
      <Footer />
    </>
  );
}
