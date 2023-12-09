import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { deleteFriend } from "../containers/Profile";
import { deleteFriendFromSF } from "../containers/SwiftFriends";

export const DeleteFriend = ({ id }) => {
  return (
    <div className="">
      <button
        onClick={() => {
          deleteFriend(id);
          if (deleteFriendFromSF) {
            deleteFriendFromSF(id);
          }
        }}
      >
        <FontAwesomeIcon icon={faUserMinus} className="h-8 text-red-400" />
      </button>
    </div>
  );
};
