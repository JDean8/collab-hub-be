import { projectRouter } from "./project-router";
import { userRouter } from "./user-router";
import { skillsRouter } from "./skills-router";
import { statusRouter } from "./status-router";
import { chatRouter } from "./chat-router";
const { getAllEndpoints } = require("../controllers/EndPointController");

export const apiRouter = require("express").Router();

apiRouter.get("/", getAllEndpoints);
apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/status", statusRouter);
apiRouter.use("/chat", chatRouter)
