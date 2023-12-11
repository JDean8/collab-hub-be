"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const { selectAllUsers } = require("../models/UserModel");
const getAllUsers = (req, res, next) => {
    selectAllUsers().then((res) => {
        console.log(res);
    });
};
exports.getAllUsers = getAllUsers;
