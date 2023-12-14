export const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserByID,
  deleteUser,
  postUser,
} = require("../controllers/UserController");

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter.route("/:user_id").get(getUserByID).delete(deleteUser);
