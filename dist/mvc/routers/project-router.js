"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRouter = void 0;
exports.projectRouter = require("express").Router();
const { getAllProjects, postProject, } = require("../controllers/ProjectController");
exports.projectRouter.route("/").get(getAllProjects).post(postProject);
