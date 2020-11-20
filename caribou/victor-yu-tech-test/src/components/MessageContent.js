import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import "../styles/MessageContent.scss";

export default function MessageContent({ message, senderId, time }) {
  const { userData } = useContext(UserContext);

  return (
    <div
      className={
        userData.user.id === senderId ? "sender-message" : "contact-message"
      }
    >
      <div className="content">
        <p>{message}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
