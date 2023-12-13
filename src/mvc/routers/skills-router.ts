export const skillsRouter = require("express").Router();
const { getAllSkills } = require("../controllers/SkillsController");

skillsRouter.route("/").get(getAllSkills);