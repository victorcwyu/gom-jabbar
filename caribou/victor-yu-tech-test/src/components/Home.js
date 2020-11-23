import React from "react";
import Contacts from "./Contacts";
import ContactSearch from "./ContactSearch";
import ReportsMap from "./ReportsMap";
import "../styles/Home.scss";

export default function Home() {
  return (
    <div className="contactsAndMapContainer">
      <Contacts />
      <ContactSearch />
      <ReportsMap />
    </div>
  );
}
