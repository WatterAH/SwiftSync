import { useState } from "react";
import loadingGif from "../assets/loading.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faUser,
  faStar,
  faHeadphones,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { URL } from "./Home";

export function Register({ setCurrentForm }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [loading, setLoading] = useState(false);

  const reg = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const body = {
        username: username.trim(),
        password: password.trim(),
        selectedIcon,
      };
      const res = await fetch(`${URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const resData = await res.json();

      if (!res.ok) {
        toast.error(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        toast.success(resData.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setLoading(false);
        setCurrentForm("auth");
      }
    } catch (error) {
      toast.error("Client Error", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
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
              className="rounded-md p-3 mb-3 w-full border-0 shadow-sm focus-visible:outline-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onChange={(e) => setPassword(e.target.value)}
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
            <a
              href="#"
              onClick={() => {
                setCurrentForm("auth");
              }}
            >
              Already have an account?
            </a>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
