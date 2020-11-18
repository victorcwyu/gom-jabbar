import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import Contacts from "./Contacts";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("authentication-token");
    localStorage.removeItem("googleMaps");
    setUserData({ ...userData, token: null });
    history.push("/");
  };

  return (
    <>
      <h1>Welcome back {userData.user.username}!</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <Contacts />
    </>
  );
}
