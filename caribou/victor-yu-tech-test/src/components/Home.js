import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Home() {
  const { userData, setUserData } = useContext(UserContext);

  return <div></div>;
}
