import { useState, useEffect } from "react";
import { URL, socket } from "../Login/LoginRoom.jsx";
import { useNavigate } from "react-router-dom";
import { GlobalList } from "../../components/GlobalList.jsx";
import { Menu } from "../../components/Menu.jsx";

export const Actions = ({ visible }) => {
  const [users, setUsers] = useState([]);
  const [currentTab, setCurrentTab] = useState("global");
  const nav = useNavigate();

  const renderContent = () => {
    switch (currentTab) {
      case "global":
        return <GlobalList users={users}></GlobalList>;
      case "chats":
        return <p className="p-4">Coming soon</p>;
      case "notifications":
        return <p className="p-4">Coming soon</p>;
      default:
        break;
    }
  };

  //Solicitar Chat
  // const handleRequestChat = (user) => {
  //   // socket.emit("requestChat", user);
  // };

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

  return (
    <div
      className={`h-screen ${
        !visible ? "w-4/5 md:w-3/5 lg:w-1/3" : "lg:w-1/3"
      } bg-zinc-800 flex flex-col z-10 rounded-md`}
    >
      {/* {pendingRequests.length > 0 && (
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
      )} */}

      <div className="py-3 px-4">
        <h1 className="text-4xl text-white">SwiftSync</h1>
      </div>
      <Menu currentTab={currentTab} setCurrentTab={setCurrentTab}></Menu>
      {renderContent()}
    </div>
  );
};
