"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
exports.userRouter = require("express").Router();
const { getAllUsers, getUserByID, deleteUser, postUser, } = require("../controllers/UserController");
const { getUserSkills, postUserSkill, } = require("../controllers/SkillsController");


exports.userRouter.route("/").get(getAllUsers).post(postUser);
exports.userRouter.route("/:user_id").get(getUserByID).delete(deleteUser);
exports.userRouter.route("/:user_id/skills").get(getUserSkills).post(postUserSkill);
