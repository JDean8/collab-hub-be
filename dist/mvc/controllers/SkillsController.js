"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllSkills } = require("../models/SkillsModel");
exports.getAllSkills = (req, res, next) => {
    fetchAllSkills()
        .then((data) => {
        res.status(200).send({ skills: data });
    })
        .catch((err) => next(err));
};
