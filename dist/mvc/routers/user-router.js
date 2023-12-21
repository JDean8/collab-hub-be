"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
exports.userRouter = require("express").Router();
const { getAllUsers, getUserByID, deleteUser, postUser, patchUser, getUserByEmail, } = require("../controllers/UserController");
const { getUserSkills, postUserSkill, deleteUserSkill, } = require("../controllers/SkillsController");
exports.userRouter.route("/").get(getAllUsers).post(postUser);
exports.userRouter
    .route("/:user_id")
    .get(getUserByID)
    .delete(deleteUser)
    .patch(patchUser);
exports.userRouter.route("/:user_id/skills").get(getUserSkills).post(postUserSkill);
exports.userRouter.route("/:user_id/skills/:skill_id").delete(deleteUserSkill);
exports.userRouter.route("/signin/:user_email").get(getUserByEmail);
