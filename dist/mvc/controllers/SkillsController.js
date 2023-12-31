"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { fetchAllSkills, fetchUserSkills, createUserSkill, removeUserSkill, } = require("../models/SkillsModel");
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
    return selectUserByID(user_id)
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
    selectUserByID(user_id)
        .then(() => {
        return createUserSkill(user_id, req.body);
    })
        .then((skill) => {
        res.status(201).send({ skill });
    })
        .catch((err) => next(err));
};
exports.deleteUserSkill = (req, res, next) => {
    const { user_id, skill_id } = req.params;
    removeUserSkill(user_id, skill_id)
        .then(() => {
        res.status(204).send();
    })
        .catch((err) => next(err));
};
