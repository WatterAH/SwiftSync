import React from "react";
import { profile } from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFa } from "../containers/GlobalList";
import { DeleteFriend } from "./DeleteFriend";

export const Friend = ({ friend }) => {
  return (
    <div className="border-b border-gray-500 flex flex-col text-xs sm:text-base px-3 pb-3">
      <span className="flex text-xs items-center ml-auto mb-2">
        <p>
          Since {friend.date.month} {friend.date.day}
        </p>
      </span>
      <div className="flex justify-between">
        <li className="list-none flex items-center">
          <FontAwesomeIcon icon={getFa(friend.icon)} className="mr-4 h-10" />
          <p
            onClick={() => profile(friend.friend_id)}
            className="text-xl hover:underline hover:cursor-pointer"
          >
            {friend.username}
          </p>
        </li>
        <DeleteFriend id={friend.friend_id}></DeleteFriend>
      </div>
    </div>
  );
};
