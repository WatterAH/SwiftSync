import { InputMessage } from "../components/InputMessage.jsx";
import { MessageList } from "../Chat/MessageList.jsx";
import { useState, useEffect } from "react";
import { socket } from "../Home/Login.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function Private() {
  const { privateRoom, username, id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState("");
  const nav = useNavigate();

  //Escribir y dejar de escribir
  const handleTyping = () => {
    let typingTimer;
    socket.emit("typing", socket.id, id);
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      socket.emit("stoppedTyping", id);
    }, 1000);
  };

  useEffect(() => {
    socket.on("stoppedTyping", () => {
      setTyping("");
    });

    return () => {
      socket.off("stoppedTyping");
    };
  });

  //Enviar mensaje privado
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length == 0) {
      return;
    }
    socket.emit("privateMessage", message, privateRoom);
    socket.emit("stoppedTyping", id);
    setMessage("");
  };

  useEffect(() => {
    socket.on("typing", (nameTyping) => {
      setTyping(nameTyping);
    });

    return () => {
      socket.off("typing");
    };
  });

  //Recibir mensaje privado
  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((state) => [...state, message]);
    };
    socket.on("privateMessage", handleMessage);

    return () => {
      socket.off("privateMessage", handleMessage);
    };
  }, []);

  //Salir del chat privado
  const handleExit = () => {
    const data = {
      name: socket.username,
      selectedIcon: socket.icon,
    };
    socket.emit("userConnected", data);
    socket.emit("userDisconnect", id, data.name);
    nav("/ss");
  };

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((state) => [...state, message]);
    };
    socket.on("nameDisconnectPrivate", handleMessage);

    return () => {
      socket.off("nameDisconnectPrivate", handleMessage);
    };
  });

  useEffect(() => {
    socket.on("closeChat", () => {
      const data = {
        name: socket.username,
        selectedIcon: socket.icon,
      };
      setTimeout(() => {
        socket.emit("userConnected", data);
        nav("/ss");
      }, 1800);
    });
    return () => {
      socket.off("closeChat");
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

  return (
    <div className="h-screen bg-zinc-800 text-white flex">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 rounded-md px-4 py-4 flex flex-col justify-between h-full m-auto lg:w-2/3 w-full right-0"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 overflow-hidden mr-5">
            <a onClick={handleExit}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="w-full h-full object-cover hover:text-amber-200 hover:cursor-pointer"
              ></FontAwesomeIcon>
            </a>
          </div>
          <div className="flex items-center">
            <h1 className="text-4xl">
              {username}, {socket.username}
            </h1>
            <p className="text-md ml-3 text-slate-600">{typing}</p>
          </div>
        </div>
        <MessageList messages={messages} setMessages={setMessages} />
        <Message
          setMessage={setMessage}
          message={message}
          handleTyping={handleTyping}
        />
      </form>
    </div>
  );
}
