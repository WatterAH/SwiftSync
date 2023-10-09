import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);
const users = {};
const sockets = {};

io.on("connection", (socket) => {
  //Usuario conectado
  socket.on("userConnected", (data) => {
    socket.username = data.name;
    socket.icon = data.selectedIcon;

    users[socket.id] = {
      id: socket.id,
      name: data.name,
      icon: data.selectedIcon,
    };
    sockets[socket.id] = socket;

    io.emit("userConnected", Object.values(users));
    io.emit("nameConnected", {
      body: socket.username,
      from: "notifyCon",
    });
  });

  socket.on("tryingCon", (name) => {
    if (name == null) {
      socket.emit("tryingCon");
    }
  });

  //Usuario desconectado
  socket.on("disconnect", () => {
    if (!users[socket.id]) {
      return;
    }
    delete users[socket.id];
    delete sockets[socket.id];
    io.emit("userConnected", Object.values(users));
    io.emit("nameDisconnected", {
      body: socket.username,
      from: "notifyDisc",
    });
  });

  //Usuario desconectado (privado)
  socket.on("userDisconnect", (socketId, name) => {
    io.to(socketId).emit("nameDisconnectPrivate", {
      body: name,
      from: "notifyDisc",
    });
    io.to(socketId).emit("closeChat");
  });

  //Mensaje global
  socket.on("message", (body) => {
    try {
      io.emit("message", {
        id: socket.id,
        body,
        from: socket.username,
        icon: socket.icon,
      });
    } catch (error) {
      socket.emit("reload");
    }
  });

  //Mensaje privado
  socket.on("privateMessage", (privateMessage, privateRoom) => {
    try {
      io.to(privateRoom).emit("privateMessage", {
        id: socket.id,
        body: privateMessage,
        from: socket.username,
        icon: socket.icon,
      });
    } catch (error) {
      socket.emit("reload");
    }
  });

  //Escribiendo
  socket.on("typing", (id_user1, id_user2) => {
    try {
      const name = sockets[id_user1].username;
      io.to(id_user2).emit("typing", name + " is typing...");
    } catch (error) {
      socket.emit("reload");
    }
  });

  //Dejar de escribir
  socket.on("stoppedTyping", (id_user) => {
    try {
      io.to(id_user).emit("stoppedTyping");
    } catch (error) {
      socket.emit("reload");
    }
  });

  //Solicitar chat Privado
  socket.on("requestChat", (userId) => {
    const user_start = sockets[socket.id];
    const user_end = sockets[userId];
    io.to(user_end.id).emit("requestChat", {
      username: users[user_start.id].name,
      userId: user_start.id,
    });
  });

  //Iniciar chat Privado
  socket.on("startChat", (userId) => {
    const user_start = sockets[socket.id];
    const user_end = sockets[userId];
    const privateRoom = `${user_start.id}-${user_end.id}`;
    user_start.join(privateRoom);
    user_end.join(privateRoom);

    io.to(user_start.id).emit("privateMe", {
      privateRoom,
      username: user_end.username,
      id: user_end.id,
    });

    io.to(user_end.id).emit("privateThem", {
      privateRoom,
      username: user_start.username,
      id: user_start.id,
    });

    delete users[user_start.id];
    delete users[user_end.id];
    io.emit("userConnected", Object.values(users));
    io.emit("nameDisconnected", {
      body: user_start.username,
      from: "notifyDisc",
    });
    io.emit("nameDisconnected", {
      body: user_end.username,
      from: "notifyDisc",
    });
  });
});

server.listen(3000, () => console.log("Server Started"));
