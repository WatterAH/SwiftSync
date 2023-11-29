import { useState } from "react";
import loadingGif from "../assets/loading.gif";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { URL } from "./Home";

export let socket;

export function Login({ setCurrentForm }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      username: userName.trim(),
      password: password.trim(),
    };
    try {
      const res = await fetch(`${URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (res.status != 200) {
        toast.error(response.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (res.status == 200) {
        socket = io("http://localhost:3000", {
          transports: ["websocket"],
        });
        const miydata = {
          name: response.username,
          selectedIcon: response.icon,
        };
        socket.username = response.username;
        socket.icon = response.icon;
        socket.emit("userConnected", miydata);
        nav("/ss");
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={auth}>
        <div className="py-5 flex justify-center">
          <p className="text-white">A new SN to meet your new friends!</p>
        </div>
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
            <a
              href="#"
              onClick={() => {
                setCurrentForm("reg");
              }}
            >
              Don't have an account?
            </a>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
