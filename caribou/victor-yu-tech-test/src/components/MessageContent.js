import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function MessageContent({ message, senderId, time }) {
  const { userData } = useContext(UserContext);

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
