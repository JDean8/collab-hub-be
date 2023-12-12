"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const { getAllUsers } = require("../controllers/UserController");
exports.userRouter = require("express").Router();
exports.userRouter.route("/").get(getAllUsers);
