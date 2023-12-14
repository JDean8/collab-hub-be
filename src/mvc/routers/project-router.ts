export const projectRouter = require("express").Router();
const {
  getAllProjects,
  postProject,
  getProjectById,
  getSkillsByProjectId,
  patchProjectById,
  deleteProjectById
} = require("../controllers/ProjectController");

projectRouter.route("/").get(getAllProjects).post(postProject);
projectRouter.route("/:project_id").get(getProjectById).patch(patchProjectById).delete(deleteProjectById);
projectRouter.route("/:project_id/skills").get(getSkillsByProjectId);