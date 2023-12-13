export const projectRouter = require("express").Router();
const {
  getAllProjects,
  postProject,
} = require("../controllers/ProjectController");

projectRouter.route("/").get(getAllProjects).post(postProject);
