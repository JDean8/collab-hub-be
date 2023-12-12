"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { selectAllUsers } = require("../models/UserModel");
exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
        .then((data) => {
        res.status(200).send({ users: data });
    })
        .catch((err) => next(err));
};
