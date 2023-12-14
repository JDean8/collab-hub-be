"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllUsers, removeUser, selectUserByID, } = require("../models/UserModel");
exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
        .then((data) => {
        res.status(200).send({ users: data });
    })
        .catch((err) => next(err));
};
exports.getUserByID = (req, res, next) => {
    const { user_id } = req.params;
    selectUserByID(user_id)
        .then((data) => {
        res.status(200).send({ user: data });
    })
        .catch((err) => next(err));
};
exports.deleteUser = (req, res, next) => {
    const { user_id } = req.params;
    selectUserByID(user_id)
        .then(() => {
        return removeUser(user_id);
    })
        .then((data) => {
        res.sendStatus(204);
    })
        .catch((err) => next(err));
};
