import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import Contacts from "./Contacts";
import ReportsMap from "./ReportsMap";
import Header from "./Header";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);

  return (
    <>
      <Header />
      <h1>Welcome back {userData.user.username}!</h1>
      <Contacts />
      <ReportsMap />
    </>
  );
}
