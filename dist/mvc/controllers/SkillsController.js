"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllSkills, fetchUserSkills } = require("../models/SkillsModel");
exports.getAllSkills = (req, res, next) => {
    fetchAllSkills()
        .then((data) => {
        res.status(200).send({ skills: data });
    })
        .catch((err) => next(err));
};
exports.getUserSkills = (req, res, next) => {
    const { user_id } = req.params;
    fetchUserSkills(user_id)
        .then((data) => {
        res.status(200).send({ skills: data });
    })
        .catch((err) => next(err));
};
