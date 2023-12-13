export const projectRouter = require("express").Router();
const { getAllProjects } = require("../controllers/ProjectController");

projectRouter.route("/").get(getAllProjects);
