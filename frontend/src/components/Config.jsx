import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { socket } from "../Home/Login";
import { useNavigate } from "react-router-dom";
import { URL } from "../Home/Home";

export const Config = ({ setCurrentTab, setUserId }) => {
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

  const elements = [
    {
      title: "My Profile",
      def: () => {
        setCurrentTab("profile");
        setUserId(socket.id_user);
        setConfig(false);
      },
      id: 1,
    },
    {
      title: "Swift Friends",
      def: () => {},
      id: 2,
    },
    {
      title: "Notifications",
      def: () => {
        setCurrentTab("notifications");
        setConfig(false);
      },
      id: 3,
    },
    {
      title: "Logout",
      def: logout,
      id: 4,
    },
  ];

  return (
    <div className="flex justify-center">
      <button onClick={displayConfig}>
        <FontAwesomeIcon className="w-6 h-6" icon={faGear}></FontAwesomeIcon>
      </button>
      {config ? (
        <div className="bg-zinc-500 mt-10 p-3 absolute rounded-lg z-30">
          <ul className="flex-1 overflow-y-auto">
            {elements.map((element) => (
              <li
                key={element.id}
                className="p-3 border-b border-gray-600 hover:bg-gray-700 text-sm sm:text-base"
              >
                <a href="#" onClick={element.def}>
                  {element.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
