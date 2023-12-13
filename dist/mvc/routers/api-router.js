"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const user_router_1 = require("./user-router");
const skills_router_1 = require("./skills-router");
exports.apiRouter = require("express").Router();
exports.apiRouter.use("/users", user_router_1.userRouter);
exports.apiRouter.use("/skills", skills_router_1.skillsRouter);
