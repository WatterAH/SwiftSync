import { socket } from "../Home/Login.jsx";
import { useState, useEffect } from "react";
import { MessageList } from "./MessageList.jsx";
import { Actions } from "./Actions.jsx";
import { InputMessage } from "../components/InputMessage.jsx";
import { useNavigate } from "react-router-dom";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionsButton } from "../components/ActionsButton.jsx";

export let navigation;

export function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = useState(true);
  const nav = useNavigate();

  //Enviar mensaje
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length == 0) {
      return;
    }
    const data = {
      message: message.trim(),
      id_user: socket.id_user,
    };
    socket.emit("message", data);
    setMessage("");
  };

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

  navigation = () => {
    setVisible(!visible);
  };

  return (
    <div className="h-screen relative flex bg-zinc-800 text-white">
      <Actions visible={visible} />
      <form
        onSubmit={handleSubmit}
        className={`bg-zinc-900 rounded-md top-0 right-0 px-4 py-4 flex flex-col justify-between w-screen lg:w-2/3 ${
          visible ? "z-10" : "z-0"
        } absolute h-screen`}
      >
        <ActionsButton></ActionsButton>
        <MessageList messages={messages} />
        <InputMessage setMessage={setMessage} message={message} />
      </form>
    </div>
  );
}
