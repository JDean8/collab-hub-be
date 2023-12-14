"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllProjects, insertProject } = require("../models/ProjectModel");
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
