export const userRouter = require("express").Router();

const {
  getAllUsers,
  getUserByID,
  deleteUser,
  postUser,
  patchUser,
  getUserByEmail,
  getUserProjects,
  getUserProjectsByMember,
  getUserRequests,
  loginWithEmailAndPassword
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
userRouter.route("/signin/:user_email").get(getUserByEmail);
userRouter.route("/:user_id/my-projects").get(getUserProjects);
userRouter.route("/:user_id/project-associate").get(getUserProjectsByMember)
userRouter.route("/:user_id/my-requests").get(getUserRequests);
userRouter.route("/login").post(loginWithEmailAndPassword);