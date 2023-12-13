"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const project_router_1 = require("./project-router");
const user_router_1 = require("./user-router");
const skills_router_1 = require("./skills-router");
const status_router_1 = require("./status-router");
exports.apiRouter = require("express").Router();
exports.apiRouter.use("/users", user_router_1.userRouter);
exports.apiRouter.use("/projects", project_router_1.projectRouter);
exports.apiRouter.use("/skills", skills_router_1.skillsRouter);
exports.apiRouter.use("/status", status_router_1.statusRouter);

