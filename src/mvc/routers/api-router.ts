import { userRouter } from "./user-router";
import { skillsRouter } from "./skills-router";

export const apiRouter = require("express").Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/skills", skillsRouter);
