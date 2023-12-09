import React from "react";
import { socket } from "../Home/Login.jsx";
import {
  faHeadphones,
  faStar,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { UserGlobal } from "../components/UserGlobal.jsx";
import { EmptyGlobal } from "../components/Empty/EmptyGlobal.jsx";

export const getFa = (icon) => {
  const icons = [faUser, faPhoenixSquadron, faHeart, faStar, faHeadphones];
  return icons[icon];
};

export function GlobalList({ users }) {
  return (
    <ul className="flex-1 overflow-y-auto">
      {users.length === 1 ? (
        <EmptyGlobal></EmptyGlobal>
      ) : (
        users.map((user) =>
          user.id != socket.id ? (
            <UserGlobal key={user.id} user={user}></UserGlobal>
          ) : null
        )
      )}
    </ul>
  );
}
