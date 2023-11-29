import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { socket } from "../Home/Login";
import { useNavigate } from "react-router-dom";
import { URL } from "../Home/Home";

export const Dropdown = () => {
  const [config, setConfig] = useState(false);
  const nav = useNavigate();

  const displayConfig = () => {
    setConfig(!config);
  };

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
    <div className="w-6 h-6">
      <button onClick={displayConfig}>
        <FontAwesomeIcon className="w-6 h-6" icon={faGear}></FontAwesomeIcon>
      </button>
      {config ? (
        <div className="bg-zinc-500 mt-4 p-3 absolute rounded-lg z-30">
          <ul className="flex-1 overflow-y-auto">
            <li className="p-3 border-b border-gray-600 hover:bg-gray-700 text-sm sm:text-base">
              <a href="#">My Profile</a>
            </li>
            <li className="p-3 border-b border-gray-600 hover:bg-gray-700 text-sm sm:text-base">
              <a href="#">Swift Friends</a>
            </li>
            <li className="p-3 border-b border-gray-600 hover:bg-gray-700 text-sm sm:text-base">
              <a href="#" onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
