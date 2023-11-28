import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookie from "cookie-parser";
import { Server as SocketServer } from "socket.io";
import { connected, disconnected } from "./sockets/users.socket.js";
import { globalMessage, privateMessage } from "./sockets/messages.socket.js";
import {
  endPrivateChat,
  requestPrivateChat,
  startPrivateChat,
} from "./sockets/privado.socket.js";
import { stoppedTyping, typing } from "./sockets/privateEvents.socket.js";
import { tryingConnection } from "./sockets/errors.socket.js";
import { accountRouter } from "./routes/accounts.routes.js";

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "https://swiftsync.vercel.app",
  },
});
const users = {};
const sockets = {};

app.use(
  cors({
    origin: "https://swiftsync.vercel.app",
    credentials: true,
  })
);
app.use(cookie());
app.use(bodyParser.json());
app.use(accountRouter);

io.on("connection", (socket) => {
  connected(socket, io, users, sockets);
  disconnected(socket, io, users, sockets);

  globalMessage(socket, io);
  privateMessage(socket, io);

  requestPrivateChat(socket, io, users, sockets);
  startPrivateChat(socket, io, users, sockets);
  endPrivateChat(socket, io);

  typing(socket, io, sockets);
  stoppedTyping(socket, io);

  tryingConnection(socket);
});

server.listen(port);
