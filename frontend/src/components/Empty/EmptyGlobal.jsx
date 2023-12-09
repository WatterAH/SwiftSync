import { faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const EmptyGlobal = () => {
  return (
    <div className="flex items-center p-4">
      <FontAwesomeIcon
        icon={faUsersSlash}
        className="mr-5 w-12 h-12 text-red-200"
      ></FontAwesomeIcon>
      <p className="text-lg">Seems that we're alone...</p>
    </div>
  );
};
