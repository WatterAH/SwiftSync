export const connected = (socket, io, users, sockets) => {
  socket.on("userConnected", (data) => {
    socket.username = data.username;
    socket.icon = data.icon;

    users[socket.id] = {
      id: socket.id,
      db_id: data.id,
      username: data.username,
      icon: data.icon,
    };
    sockets[socket.id] = socket;

    io.emit("userConnected", Object.values(users));
    io.emit("nameConnected", {
      body: socket.username,
      from: "Connection",
      type: "UserAlert",
    });
  });
};

export const disconnected = (socket, io, users, sockets) => {
  socket.on("disconnect", () => {
    if (!users[socket.id]) {
      return;
    }
    delete users[socket.id];
    delete sockets[socket.id];
    io.emit("userConnected", Object.values(users));
    io.emit("nameDisconnected", {
      body: socket.username,
      from: "Disconnection",
      type: "UserAlert",
    });
  });
};
