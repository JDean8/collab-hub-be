"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
exports.projectRouter = require("express").Router();
const { getAllProjects, postProject, getProjectById, getSkillsByProjectId, patchProjectById, deleteProjectById, getProjectStatusByProjectId, postProjectStatusByProjectId, patchProjectStatusById, postSkillsByProjectId, deleteSkillById, getProjectMembersByProjectId, getMemberRequestsByProjectId, postMemberRequestByProjectId, deleteMemberRequestByProjectId, deleteMemberByProjectId, postMemberByProjectId } = require("../controllers/ProjectController");
exports.projectRouter.route("/").get(getAllProjects).post(postProject);
exports.projectRouter
    .route("/:project_id")
    .get(getProjectById)
    .patch(patchProjectById)
    .delete(deleteProjectById);
exports.projectRouter
    .route("/:project_id/skills")
    .get(getSkillsByProjectId)
    .post(postSkillsByProjectId);
exports.projectRouter.route("/:project_id/skills/:skill_id").delete(deleteSkillById);
exports.projectRouter
    .route("/:project_id/status")
    .get(getProjectStatusByProjectId)
    .post(postProjectStatusByProjectId)
    .patch(patchProjectStatusById);
exports.projectRouter.route("/:project_id/members").get(getProjectMembersByProjectId).post(postMemberByProjectId);
exports.projectRouter
    .route("/:project_id/member-request")
    .get(getMemberRequestsByProjectId)
    .post(postMemberRequestByProjectId);
exports.projectRouter
    .route("/:project_id/member-request/:user_id")
    .delete(deleteMemberRequestByProjectId);
exports.projectRouter
    .route("/:project_id/members/:user_id")
    .delete(deleteMemberByProjectId);
