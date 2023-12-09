import React from "react";
import { profile } from "./Search";
import { getFa } from "../containers/GlobalList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UserGlobal = ({ user }) => {
  return (
    <li
      className="flex items-center cursor-pointer px-4 py-3 border-b border-gray-600"
      onClick={() => profile(user.db_id)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 overflow-hidden">
          <FontAwesomeIcon
            icon={getFa(user.icon)}
            className="w-full h-full object-cover hover:text-amber-200"
          />
        </div>
        <div>
          <div className="flex items-center">
            <p className="text-xl font-semibold text-white">{user.username}</p>
            <div className="ml-1 w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
      </div>
    </li>
  );
};
