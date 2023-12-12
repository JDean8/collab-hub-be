"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const user_router_1 = require("./user-router");
exports.apiRouter = require("express").Router();
exports.apiRouter.use("/users", user_router_1.userRouter);
