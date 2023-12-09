import React from "react";
import { Dropdown } from "../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faComments,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export function Menu({ currentTab, setCurrentTab, setUserId }) {
  return (
    <div className="flex items-center justify-between text-xs sm:text-sm px-3 sm:px-4 md:px-8 py-6 border-b border-t border-gray-600">
      <button
        className={`${
          currentTab == "global" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("global")}
      >
        <FontAwesomeIcon
          icon={faGlobe}
          className="mr-3 text-amber-200"
        ></FontAwesomeIcon>
        Global
      </button>
      <button
        className={`${
          currentTab == "chats" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("chats")}
      >
        <FontAwesomeIcon
          icon={faComments}
          className="mr-3 text-amber-200"
        ></FontAwesomeIcon>
        Chats
      </button>
      <button
        className={`${
          currentTab == "notifications" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("notifications")}
      >
        <FontAwesomeIcon
          icon={faCheck}
          className="mr-3 text-amber-200"
        ></FontAwesomeIcon>
        Notifications
      </button>
      <Dropdown setCurrentTab={setCurrentTab} setUserId={setUserId}></Dropdown>
    </div>
  );
}
