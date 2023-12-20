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
  deleteSkillById,
  getProjectMembersByProjectId,
  getMemberRequestsByProjectId,
  postMemberRequestByProjectId,
  deleteMemberRequestByProjectId,
  deleteMemberByProjectId,
} = require("../controllers/ProjectController");

projectRouter.route("/").get(getAllProjects).post(postProject);
projectRouter
  .route("/:project_id")
  .get(getProjectById)
  .patch(patchProjectById)
  .delete(deleteProjectById);
projectRouter
  .route("/:project_id/skills")
  .get(getSkillsByProjectId)
  .post(postSkillsByProjectId);
projectRouter.route("/:project_id/skills/:skill_id").delete(deleteSkillById);
projectRouter
  .route("/:project_id/status")
  .get(getProjectStatusByProjectId)
  .post(postProjectStatusByProjectId)
  .patch(patchProjectStatusById);
projectRouter.route("/:project_id/members").get(getProjectMembersByProjectId);
projectRouter
  .route("/:project_id/member-request")
  .get(getMemberRequestsByProjectId)
  .post(postMemberRequestByProjectId);
projectRouter
  .route("/:project_id/member-request/:user_id")
  .delete(deleteMemberRequestByProjectId);
projectRouter
  .route("/:project_id/members/:user_id")
  .delete(deleteMemberByProjectId);
