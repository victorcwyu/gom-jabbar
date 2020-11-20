import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import Contacts from "./Contacts";
import ReportsMap from "./ReportsMap";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUserData({ ...userData, token: null });
    history.push("/");
  };

  return (
    <>
      <h1>Welcome back {userData.user.username}!</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <Contacts />
      <ReportsMap />
    </>
  );
}
