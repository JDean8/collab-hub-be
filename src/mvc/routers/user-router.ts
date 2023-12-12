export const userRouter = require("express").Router();
const { getAllUsers } = require("../controllers/UserController");

userRouter.route("/").get(getAllUsers);
