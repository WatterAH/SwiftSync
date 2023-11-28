import { socket } from "../Login/LoginRoom.jsx";
import { useState, useEffect } from "react";
import { MessageList } from "./MessageList.jsx";
import { Actions } from "./Actions.jsx";
import { Message } from "./Message.jsx";
import { useNavigate } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(true);
  const [notify, setNotify] = useState(false);
  const nav = useNavigate();

  //Enviar mensaje
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length == 0) {
      return;
    }
    socket.emit("message", message.trim());
    setMessage("");
  };

  //Establecer notificacion
  useEffect(() => {
    socket.on("requestChat", () => {
      setNotify(true);
    });

    return () => socket.off("requestChat");
  }, []);

  //Recibir mensaje
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((state) => [...state, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  //Notificacion del chat (usuario conectado)
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((state) => [...state, message]);
    };
    socket.on("nameConnected", handleMessage);

    return () => socket.off("nameConnected", handleMessage);
  });

  //Notificacion del chat (usuario desconectado)
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((state) => [...state, message]);
    };
    socket.on("nameDisconnected", handleMessage);

    return () => {
      socket.off("nameDisconnected", handleMessage);
    };
  });

  //Navegar al inicio en caso de error
  useEffect(() => {
    socket.on("reload", () => {
      nav("/");
    });

    return () => {
      socket.off("reload");
    };
  }, []);

  //

  return (
    <div className="h-screen relative flex bg-zinc-800 text-white">
      <Actions visible={visible} />
      <form
        onSubmit={handleSubmit}
        className={`bg-zinc-900 rounded-md top-0 right-0 px-4 py-4 flex flex-col justify-between w-screen lg:w-2/3 ${
          visible ? "z-10" : "z-0"
        } absolute h-screen`}
      >
        <div className="flex text-center gap-3">
          <div className="w-12 h-12 lg:hidden ml-auto">
            <div
              className={`w-4 h-4 right-2 top-2 absolute ${
                notify ? "visible" : "hidden"
              } ml-auto rounded-full bg-red-500`}
            ></div>
            <a
              className="block lg:hidden text-xl cursor-pointer"
              onClick={() => {
                setVisible(!visible);
                setNotify(false);
              }}
            >
              <FontAwesomeIcon
                icon={faUsers}
                className="w-full h-full hover:text-black"
              />
            </a>
          </div>
        </div>
        <MessageList messages={messages} setMessages={setMessages} />
        <Message
          setMessage={setMessage}
          message={message}
          handleTyping={() => null}
        />
      </form>
    </div>
  );
}
