import React from "react";
import { URL, socket } from "../src/Login/LoginRoom";
import { useNavigate } from "react-router-dom";

export function Menu({ currentTab, setCurrentTab }) {
  const nav = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`${URL}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      socket.disconnect();
      if (res.status == 200) {
        nav("/");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-t border-gray-600">
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
      <button onClick={logout}>Logout</button>
    </div>
  );
}
