export const requestPrivateChat = (socket, io, users, sockets) => {
  socket.on("requestChat", (userId) => {
    const user_start = sockets[socket.id];
    const user_end = sockets[userId];
    return io.to(user_end.id).emit("requestChat", {
      username: users[user_start.id].name,
      userId: user_start.id,
    });
  });
};

export const startPrivateChat = (socket, io, users, sockets) => {
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
};

export const endPrivateChat = (socket, io) => {
  socket.on("userDisconnect", (socketId, name) => {
    io.to(socketId).emit("nameDisconnectPrivate", {
      body: name,
      from: "notifyDisc",
    });
    io.to(socketId).emit("closeChat");
  });
};
