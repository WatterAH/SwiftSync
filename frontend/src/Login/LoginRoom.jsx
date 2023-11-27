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
import loadingGif from "../assets/loading.gif";

export const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

export function LoginRoom() {
  const [userName, setUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [ocult, setOcult] = useState(false);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const auth = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    const data = {
      username: userName.trim(),
      password: password.trim(),
    };
    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.status == 403) {
        console.log("Verifica tus credenciales");
      } else if (res.status == 200) {
        nav("/ss");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(!loading);
    }
  };

  const reg = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    const data = {
      username: newName.trim(),
      password: newPassword.trim(),
      selectedIcon,
    };

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        console.log(err);
      } else {
        setOcult(!ocult);
      }
    } catch (err) {
      throw new Error("Error interno al registrar al usuario");
    } finally {
      setLoading(!loading);
    }
  };

  const displayRegister = () => {
    setOcult(!ocult);
  };

  return (
    <div className="flex flex-1 min-h-full flex-col justify-center px-6 py-12 h-screen bg-zinc-800">
      <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-white">
          {ocult ? "Sign up for SwiftSync" : "Login to SwiftSync"}
        </h1>
      </div>
      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${
          ocult ? "hidden" : ""
        }`}
      >
        <form className="" onSubmit={auth}>
          <div>
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                className="rounded-md p-3 mb-7 w-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 "
                placeholder="@Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="my$Password123"
                className="rounded-md p-3 mb-9 w-full border-0 shadow-sm focus-visible:outline-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <div className="flex mb-7 items-center justify-center">
              <button className="text-zinc-800 bg-amber-400 p-3 rounded-md w-full">
                {loading ? (
                  <img
                    className="w-6 h-6 m-auto"
                    src={loadingGif}
                    alt="loading"
                  ></img>
                ) : (
                  "Ready?"
                )}
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center text-white">
              <a href="#" onClick={displayRegister}>
                Don't have an account?
              </a>
            </div>
          </div>
        </form>
      </div>
      <div
        className={`mt-10 sm:mx-auto sm:w-full sm:max-w-sm ${
          ocult ? "" : "hidden"
        }`}
      >
        <form className="space-y-2" onSubmit={reg}>
          <div>
            <label htmlFor="username" className="text-white">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                className="rounded-md p-3 mb-3 w-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                placeholder="@Username"
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-white">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                placeholder="my$Password123"
                className="rounded-md p-3 mb-3 w-full border-0 shadow-sm focus-visible:outline-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            </div>
          </div>
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
            <div className="flex mb-4 items-center justify-center">
              <button className="text-zinc-800 bg-amber-400 p-3 rounded-md w-full">
                {loading ? (
                  <img
                    className="w-6 h-6 m-auto"
                    src={loadingGif}
                    alt="loading"
                  ></img>
                ) : (
                  "Ready?"
                )}
              </button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center text-white">
              <a href="#" onClick={displayRegister}>
                Already have an account?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
