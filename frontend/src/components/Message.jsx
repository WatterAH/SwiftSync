import React from "react";
import { socket } from "../Home/Login";
import { navigation } from "../Chat/App";
import { profile } from "./Search";
import { getFa } from "../containers/GlobalList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Message = ({ message }) => {
  return (
    <li
      className={`p-3 my-5 mx-2.5 table text-black rounded-md ${
        message.id === socket.id ? "bg-emerald-300 ml-auto" : "bg-amber-200"
      }`}
    >
      <span
        className="text-sm font-bold block text-pink-900 hover:cursor-pointer hover:underline"
        onClick={() => {
          navigation();
          profile(message.db_id);
        }}
      >
        {message.from}
        <FontAwesomeIcon
          icon={getFa(message.icon)}
          className="inline-block ml-2"
        />
      </span>{" "}
      {message.body}
    </li>
  );
};
