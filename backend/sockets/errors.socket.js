export const tryingConnection = (socket) => {
  socket.on("tryingCon", (name) => {
    if (name == null) {
      return socket.emit("tryingCon");
    }
  });
};
