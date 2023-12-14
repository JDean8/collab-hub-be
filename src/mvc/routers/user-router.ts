export const userRouter = require("express").Router();
const { getAllUsers } = require("../controllers/UserController");
const { getUserSkills } = require("../controllers/SkillsController");

userRouter.route("/").get(getAllUsers);

userRouter.route("/:user_id/skills").get();
