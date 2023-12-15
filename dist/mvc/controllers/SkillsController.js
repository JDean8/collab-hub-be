"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllSkills, fetchUserSkills, createUserSkill, } = require("../models/SkillsModel");
const { selectUserByID } = require("../models/UserModel");
exports.getAllSkills = (req, res, next) => {
    fetchAllSkills()
        .then((data) => {
        res.status(200).send({ skills: data });
    })
        .catch((err) => next(err));
};
exports.getUserSkills = (req, res, next) => {
    const { user_id } = req.params;
    selectUserByID(user_id)
        .then(() => {
        return fetchUserSkills(user_id);
    })
        .then((data) => {
        res.status(200).send({ skills: data });
    })
        .catch((err) => next(err));
};
exports.postUserSkill = (req, res, next) => {
    const { user_id } = req.params;
    createUserSkill(user_id, req.body)
        .then((skill) => {
        res.status(201).send({ skill });
    })
        .catch((err) => next(err));
};
