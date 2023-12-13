"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillsRouter = void 0;
exports.skillsRouter = require("express").Router();
const { getAllSkills } = require("../controllers/SkillsController");
exports.skillsRouter.route("/").get(getAllSkills);
