export const userRouter = require("express").Router();
const {
  getAllUsers,
  getUserByID,
  deleteUser,
  patchUser,
} = require("../controllers/UserController");

userRouter.route("/").get(getAllUsers);
userRouter
  .route("/:user_id")
  .get(getUserByID)
  .patch(patchUser)
  .delete(deleteUser);
