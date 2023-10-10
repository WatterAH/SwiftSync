import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useEffect } from "react";
import { getFa } from "./ChatList";
import { socket } from "../Login/LoginRoom.jsx";

export const MessageList = ({ messages, setMessages }) => {
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
          message.from === "notifyCon" ? (
            <div className="flex items-center justify-center" key={i}>
              <p>
                {message.body} se ha
                <span className="text-emerald-500"> conectado</span>
              </p>
            </div>
          ) : message.from === "notifyDisc" ? (
            <div className="flex items-center justify-center">
              <p>
                {message.body} se ha
                <span className="text-red-600"> desconectado</span>
              </p>
            </div>
          ) : message.from ? (
            <li
              key={i}
              className={`p-3 my-5 mx-2.5 table text-black rounded-md ${
                message.id === socket.id
                  ? "bg-emerald-300 ml-auto"
                  : "bg-amber-200"
              }`}
            >
              <span className="text-sm font-bold block text-pink-900">
                {message.from}
                <FontAwesomeIcon
                  icon={getFa(message.icon)}
                  className="inline-block ml-2"
                />
              </span>{" "}
              {message.body}
            </li>
          ) : null
        )}

        <div ref={messageListRef}></div>
      </ul>
    </div>
  );
};
