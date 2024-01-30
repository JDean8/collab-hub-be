"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const api_router_1 = require("./mvc/routers/api-router");
const socket_io_1 = require("socket.io");
const cors = require("cors");
const express = require("express");
const http = require("http");
const { handleCustomErrors, handlePSQLErrors } = require("./errors");
exports.app = express();
exports.app.use(cors());
exports.server = http.createServer(exports.app);
const io = new socket_io_1.Server(exports.server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
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
exports.app.use(express.json());
exports.app.use("/api", api_router_1.apiRouter);
exports.app.all("/*", (req, res, next) => {
    res.status(404).send({ msg: "URL not found" });
});
exports.app.use(handleCustomErrors);
exports.app.use(handlePSQLErrors);
