"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllProjects, insertProject, selectProjectById, selectSkillsByProjectId, updateProjectById, deleteProject, fetchProjectStatus, postProjectStatus, patchStatusById, postSkills, deleteSkill } = require("../models/ProjectModel");
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
exports.getProjectStatusByProjectId = (req, res, next) => {
    return selectProjectById(req.params.project_id)
        .then(() => {
        return fetchProjectStatus(req.params.project_id);
    })
        .then((status) => {
        res.status(200).send({ status });
    })
        .catch((err) => next(err));
};
exports.postProjectStatusByProjectId = (req, res, next) => {
    const { status } = req.body;
    return postProjectStatus(req.params.project_id, status)
        .then((status_project) => {
        res.status(201).send(status_project);
    })
        .catch((err) => next(err));
};
exports.patchProjectStatusById = (req, res, next) => {
    const { status } = req.body;
    patchStatusById(req.params.project_id, status)
        .then((status_project) => {
        res.status(200).send(status_project);
    })
        .catch((err) => next(err));
};
exports.postSkillsByProjectId = (req, res, next) => {
    const { skill } = req.body;
    postSkills(req.params.project_id, skill)
        .then((skills) => {
        res.status(201).send(skills);
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteSkillById = (req, res, next) => {
    const { skill_id } = req.params;
    const { project_id } = req.params;
    return selectProjectById(req.params.project_id)
        .then(() => {
        return selectSkillsByProjectId(req.params.project_id);
    })
        .then((skills) => {
        let doesSkillExist = false;
        skills.forEach((singleSkill) => {
            if (singleSkill.skill_id === Number(skill_id)) {
                doesSkillExist = true;
            }
        });
        if (doesSkillExist === false)
            return Promise.reject({ status: 404, msg: "Skill not found" });
        return deleteSkill(skill_id, project_id);
    })
        .then(() => {
        res.sendStatus(204);
    })
        .catch((err) => next(err));
};
