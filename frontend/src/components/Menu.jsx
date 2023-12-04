import React from "react";
import { Dropdown } from "./Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";

export function Menu({ currentTab, setCurrentTab, setUserId }) {
  return (
    <div className="flex items-center justify-between px-2 text-sm sm:px-4 md:px-8 py-6 border-b border-t border-gray-600">
      <button
        className={`${
          currentTab == "global" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("global")}
      >
        <FontAwesomeIcon
          icon={faGlobe}
          className="hidden sm:mr-3 sm:inline"
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
          icon={faRocketchat}
          className="hidden sm:mr-3 sm:inline"
        ></FontAwesomeIcon>
        My chats
      </button>
      <button
        className={`${
          currentTab == "notifications" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("notifications")}
      >
        <FontAwesomeIcon
          icon={faCheck}
          className="hidden sm:mr-3 sm:inline"
        ></FontAwesomeIcon>
        Notifications
      </button>
      <Dropdown setCurrentTab={setCurrentTab} setUserId={setUserId}></Dropdown>
    </div>
  );
}
