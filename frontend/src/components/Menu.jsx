import React from "react";
import { Config } from "./Config";

export function Menu({ currentTab, setCurrentTab, setUserId }) {
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
      <Config setCurrentTab={setCurrentTab} setUserId={setUserId}></Config>
      <button
        className={`${
          currentTab == "chats" ? "underline underline-offset-8" : ""
        } `}
        onClick={() => setCurrentTab("chats")}
      >
        My chats
      </button>
    </div>
  );
}
