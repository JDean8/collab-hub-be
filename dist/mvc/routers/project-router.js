"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
exports.projectRouter = require("express").Router();
const { getAllProjects, postProject, getProjectById, getSkillsByProjectId, patchProjectById, deleteProjectById, getProjectStatusByProjectId, postProjectStatusByProjectId, patchProjectStatusById } = require("../controllers/ProjectController");
exports.projectRouter.route("/").get(getAllProjects).post(postProject);
exports.projectRouter.route("/:project_id").get(getProjectById).patch(patchProjectById).delete(deleteProjectById);
exports.projectRouter.route("/:project_id/skills").get(getSkillsByProjectId);
exports.projectRouter.route("/:project_id/status").get(getProjectStatusByProjectId).post(postProjectStatusByProjectId).patch(patchProjectStatusById);
