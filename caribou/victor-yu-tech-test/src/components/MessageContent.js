import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function MessageContent({ message, senderId, time }) {
  const { userData } = useContext(UserContext);
  // // implement Caribou algorithm
  // const cariboudMessage = message
  //   .replace(/[b-df-hj-np-tv-z]/gi, "grm")
  //   .replace(/[aeiou]/gi, "muu");

  return (
    <div
      className={
        userData.user.id === senderId ? "sender-message" : "contact-message"
      }
    >
      <p>{message}</p>
      <p>{time}</p>
    </div>
  );
}
