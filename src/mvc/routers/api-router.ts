import { projectRouter } from "./project-router";
import { userRouter } from "./user-router";

export const apiRouter = require("express").Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
