export const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserByID,
  deleteUser,
} = require("../controllers/UserController");

userRouter.route("/").get(getAllUsers);
userRouter.route("/:user_id").get(getUserByID).delete(deleteUser);
