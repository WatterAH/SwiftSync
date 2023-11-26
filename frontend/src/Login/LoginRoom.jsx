import { useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faUser,
  faStar,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";

export const socket = io("//swiftsync.fly.dev", {
  transports: ["websocket"],
});

export function LoginRoom() {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [nameVoid, setNameVoid] = useState(false);
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0 || selectedIcon === null || name.length > 10) {
      setNameVoid(true);
      return;
    }
    const data = {
      name: name.trim(),
      selectedIcon,
    };
    socket.username = name;
    socket.icon = selectedIcon;
    socket.emit("userConnected", data);
    nav("/ss");
  };

  return (
    <div className="flex flex-1 min-h-full flex-col justify-center px-6 py-12 h-screen bg-zinc-800">
      <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-white">Log-in to SwiftSync</h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                className={`rounded-md p-3 mb-7 w-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 ${
                  nameVoid ? "border-rose-500 border-2" : ""
                }`}
                placeholder="@Username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* <div>
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="my$Password123"
                className="rounded-md p-3 mb-7 w-full border-0 shadow-sm focus-visible:outline-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              ></input>
            </div>
          </div> */}
          <div>
            <label htmlFor="icon" className="text-white">
              Describe yourself
            </label>
            <div className="w-full flex items-center mt-3 mb-7 justify-center">
              {[faUser, faPhoenixSquadron, faHeart, faStar, faHeadphones].map(
                (icon, index) => (
                  <FontAwesomeIcon
                    key={index}
                    id={index}
                    icon={icon}
                    className={`w-14 h-14 mr-3 cursor-pointer ${
                      selectedIcon === index ? "text-amber-400" : "text-white"
                    }`}
                    onClick={() => setSelectedIcon(index)}
                  />
                )
              )}
            </div>
          </div>
          <div>
            <div className="flex mb-7 items-center justify-center">
              <button className="text-zinc-800 bg-amber-400 p-3 rounded-md w-full">
                Ready?
              </button>
            </div>
          </div>
          {/* <div>
            <div className="flex items-center justify-center text-white">
              <a href="#">Already have an account?</a>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}
