import React, { useEffect, useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import MessageDisplay from "./MessageDisplay";
import axios from "axios";
import "../styles/Messages.scss";

let socket;

export default function Messages() {
  const { userData } = useContext(UserContext);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const token = localStorage.getItem("authentication-token");

  useEffect(() => {
    socket = io("http://localhost:5000");

    if (!userData.user) {
      history.push("/");
    } else {
      axios
        .post(
          "http://localhost:5000/getUserMessages",
          {
            userId: userData.user.id,
            contactId: userData.contactInformation.contactId,
          },
          {
            headers: {
              "Authentication-Token": token,
            },
          }
        )
        .then((res) => {
          setMessages(res.data.userMessageHistory);
        });

      socket.emit("joinroom", userData.user);
    }
    return () => socket.disconnect();
  }, [token, userData, history]);

  if (messages) {
    socket.on("messagesUpdated", (data) => {
      const newHistory = [...messages.messageHistory, data];
      setMessages({ ...messages, messageHistory: newHistory });
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const estTime = new Date().toLocaleString("en-US", {
        timeZone: "America/Toronto",
      });

      // implement Caribou algorithm
      const cariboudMessage = message
        .replace(/[b-df-hj-np-tv-z]/gi, "grm")
        .replace(/[aeiou]/gi, "muu");

      const newMessage = {
        text: cariboudMessage,
        senderId: userData.user.id,
        timeStamp: estTime,
      };
      if (!messages) {
        setMessages({ ...messages, messageHistory: [newMessage] });
      } else {
        const currentHistory = messages.messageHistory;
        const newHistory = [...currentHistory, newMessage];
        setMessages({ ...messages, messageHistory: newHistory });
      }

      axios
        .post(
          "http://localhost:5000/updateUserMessages",
          {
            newMessage,
            messagesId: messages._id,
          },
          {
            headers: {
              "Authentication-Token": token,
            },
          }
        )
        .catch((err) => console.log(err));

      socket.emit("newMessage", {
        newMessage,
        messages: messages,
        senderId: userData.user.id,
      });

      setMessage("");
    }
  };

  return (
    <div className="messages-wrapper">
      {userData.contactInformation && (
        <h1>
          Conversation with{" "}
          <span>{userData.contactInformation.contactName}</span>
        </h1>
      )}
      <MessageDisplay messages={messages} />
      <form>
        <input
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button onClick={sendMessage}>Submit</button>
      </form>
    </div>
  );
}
