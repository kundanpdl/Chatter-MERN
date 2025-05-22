import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// To store the online users.
const socketMap = {};

io.on("connection", (socket) => {
  console.log("User Connected: ", socket.id);

  const userID = socket.handshake.query.userId;

  if (userID) socketMap[userID] = socket.id;

  io.emit("getOnlineUsers", Object.keys(socketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected: ", socket.id);
    delete socketMap[userID];
    io.emit("getOnlineUsers", Object.keys(socketMap));
  });
});

export { io, server, app };
