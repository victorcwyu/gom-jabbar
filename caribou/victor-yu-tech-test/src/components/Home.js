import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Contacts from "./Contacts";
import ReportsMap from "./ReportsMap";
import "../styles/Home.scss";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <>
      <Header />
      <div className="homeWrapper">
        <div className="welcomeAndLogoutContainer">
          <h1>Welcome back {userData.user.username}!</h1>
        </div>
        <div className="contactsAndMapContainer">
          <Contacts />
          <ReportsMap />
        </div>
      </div>
      <Footer />
    </>
  );
}
