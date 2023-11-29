import React from "react";
import { Dropdown } from "./Dropdown";

export function Menu({ currentTab, setCurrentTab }) {
  return (
    <div className="flex items-center justify-between px-2 sm:px-4 md:px-8 py-6 border-b border-t border-gray-600">
      <button
        className={`${
          currentTab == "global" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("global")}
      >
        Global
      </button>
      <button
        className={`${
          currentTab == "chats" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("chats")}
      >
        My chats
      </button>
      <button
        className={`${
          currentTab == "notifications" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("notifications")}
      >
        Notifications
      </button>
      <Dropdown></Dropdown>
    </div>
  );
}
