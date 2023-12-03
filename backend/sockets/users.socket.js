export const connected = (socket, io, users, sockets) => {
  socket.on("userConnected", (data) => {
    socket.username = data.name;
    socket.icon = data.selectedIcon;

    users[socket.id] = {
      id: socket.id,
      name: data.name,
      icon: data.selectedIcon,
      db_id: data.db_id,
    };
    sockets[socket.id] = socket;

    io.emit("userConnected", Object.values(users));
    io.emit("nameConnected", {
      body: socket.username,
      from: "notifyCon",
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
      from: "notifyDisc",
    });
  });
};
