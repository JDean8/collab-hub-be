"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllProjects } = require("../models/ProjectModel");
exports.getAllProjects = (req, res, next) => {
    selectAllProjects()
        .then((data) => {
        res.status(200).send({ projects: data });
    })
        .catch((err) => next(err));
};
