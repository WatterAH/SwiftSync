import React from "react";
import { navigation } from "../Chat/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const ActionsButton = () => {
  return (
    <div className="flex text-center gap-3">
      <div className="w-12 h-12 lg:hidden ml-auto">
        <a
          className="block lg:hidden text-xl cursor-pointer"
          onClick={navigation}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="w-full h-full hover:text-black"
          />
        </a>
      </div>
    </div>
  );
};
