"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
exports.userRouter = require("express").Router();
const { getAllUsers } = require("../controllers/UserController");
const { getUserSkills, postUserSkill, } = require("../controllers/SkillsController");
exports.userRouter.route("/").get(getAllUsers);
exports.userRouter.route("/:user_id/skills").get(getUserSkills).post(postUserSkill);
