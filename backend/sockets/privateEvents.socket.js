export const typing = (socket, io, sockets) => {
  socket.on("typing", (id_user1, id_user2) => {
    try {
      const name = sockets[id_user1].username;
      return io.to(id_user2).emit("typing", name + " is typing...");
    } catch (error) {
      return socket.emit("reload");
    }
  });
};

export const stoppedTyping = (socket, io) => {
  socket.on("stoppedTyping", (id_user) => {
    try {
      return io.to(id_user).emit("stoppedTyping");
    } catch (error) {
      return socket.emit("reload");
    }
  });
};
