import { useState, useEffect } from "react";
import { URL, socket } from "../Login/LoginRoom.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faStar,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPhoenixSquadron } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "./Tooltip.jsx";

export const getFa = (iconName) => {
  switch (iconName) {
    case 0:
      return faUser;
    case 1:
      return faPhoenixSquadron;
    case 2:
      return faHeart;
    case 3:
      return faStar;
    case 4:
      return faHeadphones;
    default:
      break;
  }
};

export const ChatList = ({ visible }) => {
  const [users, setUsers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const nav = useNavigate();

  //Solicitar Chat
  const handleRequestChat = (user) => {
    // socket.emit("requestChat", user);
  };

  //Recibir solicitud de Chat
  useEffect(() => {
    socket.on("requestChat", (data) => {
      setPendingRequests((prevRequests) => [...prevRequests, data]);
    });

    return () => socket.off("requestChat");
  }, []);

  //Lista de usuarios conectados
  useEffect(() => {
    socket.on("userConnected", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("userConnected");
    };
  }, []);

  //Iniciar chat privado
  useEffect(() => {
    socket.on("privateMe", (data) => {
      const { privateRoom, username, id } = data;
      nav(`/private/${privateRoom}/${username}/${id}`);
    });

    return () => {
      socket.off("privateMe");
    };
  });

  useEffect(() => {
    socket.on("privateThem", (data) => {
      const { privateRoom, username, id } = data;
      nav(`/private/${privateRoom}/${username}/${id}`);
    });

    return () => {
      socket.off("privateThem");
    };
  }, []);

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
    <div
      className={`h-screen ${
        !visible ? "w-4/5 md:w-3/5 lg:w-1/3" : "lg:w-1/3"
      } bg-zinc-800 p-4 flex flex-col z-10`}
    >
      {pendingRequests.length > 0 && (
        <div className="fixed bottom-4 left-4 z-50">
          {pendingRequests.map((request, index) => (
            <div
              key={index}
              className="bg-white flex flex-col gap-y-2 p-3 rounded shadow-lg mb-2"
            >
              <p className="text-sm text-black font-semibold">
                {request.username} wants to talk with you in private.
              </p>
              <div className="flex text-sm m-auto items-center gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => {
                    socket.emit("startChat", request.userId);
                    setPendingRequests((prevRequests) =>
                      prevRequests.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 hover:bg-red-800 text-white font-bold py-1 px-2 rounded"
                  onClick={() => {
                    setPendingRequests((prevRequests) =>
                      prevRequests.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-7">
        <div className="flex">
          <h1 className="text-4xl text-white">Global</h1>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {users.length === 1 ? (
          <p className="text-white">Seems that we're alone...</p>
        ) : (
          users.map((user) =>
            user.id != socket.id ? (
              <li
                key={user.id}
                className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-600"
                onClick={() => handleRequestChat(user.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 overflow-hidden">
                    <FontAwesomeIcon
                      icon={getFa(user.icon)}
                      className="w-full h-full object-cover hover:text-amber-200"
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <Tooltip text={"Request Private Chat"}>
                        <p className="text-xl font-semibold text-white">
                          {user.name}
                        </p>
                      </Tooltip>
                      <div className="ml-1 w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm text-gray-400"></p>
                  </div>
                </div>
              </li>
            ) : null
          )
        )}
      </ul>
    </div>
  );
};
