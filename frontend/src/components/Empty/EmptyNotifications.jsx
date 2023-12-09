import { faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const EmptyNotifications = () => {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={faCommentSlash}
        className="mr-5 w-12 h-12 text-red-200"
      ></FontAwesomeIcon>
      <p className="text-lg">No notifications</p>
    </div>
  );
};
