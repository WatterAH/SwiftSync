export const globalMessage = (socket, io) => {
  socket.on("message", (body) => {
    try {
      return io.emit("message", {
        id: socket.id,
        body: body.message,
        from: socket.username,
        icon: socket.icon,
        db_id: body.id_user,
      });
    } catch (error) {
      return socket.emit("reload");
    }
  });
};

export const privateMessage = (socket, io) => {
  socket.on("privateMessage", (privateMessage, privateRoom) => {
    try {
      return io.to(privateRoom).emit("privateMessage", {
        id: socket.id,
        body: privateMessage,
        from: socket.username,
        icon: socket.icon,
      });
    } catch (error) {
      return socket.emit("reload");
    }
  });
};
