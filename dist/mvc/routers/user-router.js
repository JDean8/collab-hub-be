"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
exports.userRouter = require("express").Router();
const { getAllUsers } = require("../controllers/UserController");
exports.userRouter.route("/").get(getAllUsers);
