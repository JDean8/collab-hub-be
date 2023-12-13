import { projectRouter } from "./project-router";
import { userRouter } from "./user-router";
import { skillsRouter } from "./skills-router";
import { statusRouter } from "./status-router";

export const apiRouter = require("express").Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/status", statusRouter);
