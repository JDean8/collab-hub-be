export const projectRouter = require("express").Router();
const {
  getAllProjects,
  postProject,
  getProjectById,
  getSkillsByProjectId,
  patchProjectById,
  deleteProjectById,
  getProjectStatusByProjectId,
  postProjectStatusByProjectId,
  patchProjectStatusById,
  postSkillsByProjectId,
  deleteSkillById
} = require("../controllers/ProjectController");

projectRouter.route("/").get(getAllProjects).post(postProject);
projectRouter.route("/:project_id").get(getProjectById).patch(patchProjectById).delete(deleteProjectById);
projectRouter.route("/:project_id/skills").get(getSkillsByProjectId).post(postSkillsByProjectId);
projectRouter.route("/:project_id/skills/:skill_id").delete(deleteSkillById);
projectRouter.route("/:project_id/status").get(getProjectStatusByProjectId).post(postProjectStatusByProjectId).patch(patchProjectStatusById);