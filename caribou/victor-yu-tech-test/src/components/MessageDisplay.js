import React from "react";
import MessageContent from "./MessageContent";

export default function MessageDisplay({ messages }) {
  return (
    <div className="display-container">
      <div className="display">
        {messages &&
          messages.messageHistory &&
          messages.messageHistory.map((message, index) => {
            return (
              <MessageContent
                key={index}
                message={message.text}
                senderId={message.senderId}
                time={message.timeStamp}
              />
            );
          })}
      </div>
    </div>
  );
}
