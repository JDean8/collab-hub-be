"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
exports.userRouter = require("express").Router();
const { getAllUsers, getUserByID, deleteUser, postUser, } = require("../controllers/UserController");
exports.userRouter.route("/").get(getAllUsers).post(postUser);
exports.userRouter.route("/:user_id").get(getUserByID).delete(deleteUser);
