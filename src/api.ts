import { Request, Response, NextFunction } from "express";
import { apiRouter } from "./mvc/routers/api-router";
import { Server, type Socket } from "socket.io";
const cors = require("cors");
const express = require("express");
const http = require("http");
const { handleCustomErrors, handlePSQLErrors } = require("./errors");

export const app = express();
app.use(cors());
export const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://collub-hub.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} join room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ msg: "URL not found" });
});
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
