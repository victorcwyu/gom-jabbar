import React from "react";
import Contacts from "./Contacts";
import ContactSearch from "./ContactSearch";
import ReportsMap from "./ReportsMap";
import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="contactsAndMapContainer">
      <ReportsMap />
      <div className="contacts-plus-search-wrapper">
        <Contacts />
        <ContactSearch />
      </div>
    </div>
  );
}
