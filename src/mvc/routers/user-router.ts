export const userRouter = require("express").Router();

const {
  getAllUsers,
  getUserByID,
  deleteUser,
  postUser,
  patchUser,
} = require("../controllers/UserController");

const {
  getUserSkills,
  postUserSkill,
  deleteUserSkill,
} = require("../controllers/SkillsController");

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter
  .route("/:user_id")
  .get(getUserByID)
  .delete(deleteUser)
  .patch(patchUser);
userRouter.route("/:user_id/skills").get(getUserSkills).post(postUserSkill);
userRouter.route("/:user_id/skills/:skill_id").delete(deleteUserSkill);
