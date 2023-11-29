import React from "react";
import { socket } from "../Home/Login.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faStar,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";

export const getFa = (icon) => {
  const icons = [faUser, faPhoenixSquadron, faHeart, faStar, faHeadphones];
  return icons[icon];
};

export function GlobalList({ users }) {
  return (
    <ul className="flex-1 overflow-y-auto">
      {users.length === 1 ? (
        <p className="text-white p-4">Seems that we're alone...</p>
      ) : (
        users.map((user) =>
          user.id != socket.id ? (
            <li
              key={user.id}
              className="flex items-center cursor-pointer px-4 py-3 border-b border-gray-600"
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
                    <p className="text-xl font-semibold text-white">
                      {user.name}
                    </p>
                    <div className="ml-1 w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            </li>
          ) : null
        )
      )}
    </ul>
  );
}
