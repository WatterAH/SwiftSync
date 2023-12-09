import React, { useRef, useEffect } from "react";
import { AlertConnection } from "../components/AlertConnection.jsx";
import { Message } from "../components/Message.jsx";

export const MessageList = ({ messages }) => {
  const messageListRef = useRef(null);
  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="overflow-y-auto h-full w-full">
      <ul className="w-full">
        {messages.map((message, i) =>
          message.type === "UserAlert" ? (
            <AlertConnection key={i} message={message}></AlertConnection>
          ) : (
            <Message key={i} message={message}></Message>
          )
        )}
        <div ref={messageListRef}></div>
      </ul>
    </div>
  );
};
