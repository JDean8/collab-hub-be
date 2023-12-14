"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllProjects, insertProject, selectProjectById, selectSkillsByProjectId, updateProjectById, deleteProject } = require("../models/ProjectModel");
exports.getAllProjects = (req, res, next) => {
    selectAllProjects()
        .then((data) => {
        res.status(200).send({ projects: data });
    })
        .catch((err) => next(err));
};
exports.postProject = (req, res, next) => {
    const { project } = req.body;
    insertProject(project)
        .then((project) => {
        res.status(201).send({ project });
    })
        .catch((err) => next(err));
};
exports.getProjectById = (req, res, next) => {
    selectProjectById(req.params.project_id)
        .then((project) => {
        res.status(200).send({ project });
    })
        .catch((err) => next(err));
};
exports.patchProjectById = (req, res, next) => {
    const { project } = req.body;
    if (project === undefined)
        return next({ status: 400, msg: "Bad request" });
    return selectProjectById(req.params.project_id)
        .then(() => {
        return updateProjectById(req.params.project_id, project);
    })
        .then((project) => {
        res.status(200).send({ project });
    })
        .catch((err) => next(err));
};
exports.getSkillsByProjectId = (req, res, next) => {
    return selectProjectById(req.params.project_id)
        .then(() => {
        return selectSkillsByProjectId(req.params.project_id);
    })
        .then((skills) => {
        res.status(200).send({ skills });
    })
        .catch((err) => next(err));
};
exports.deleteProjectById = (req, res, next) => {
    const { project_id } = req.params;
    deleteProject(project_id)
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => next(err));
};
